import { Address } from "@graphprotocol/graph-ts";
import {
  DankBankMarketGSN,
  ApprovalForAll,
  DankBankBuy,
  DankBankSell,
  LiquidityAdded,
  LiquidityRemoved,
  TransferBatch,
  TransferSingle,
  URI,
} from "../generated/DankBankMarketGSN/DankBankMarketGSN";
import { TransactionType } from "../utils/constants";

import {
  getLpTokenBalance,
  getMaticLiquidityPool,
  updateMaticTokenPrice,
} from "../utils/maticMarket";
import { createTransaction } from "../utils/transaction";
import { isExistingVault } from "../utils/vault";

export function handleDankBankBuy(event: DankBankBuy): void {
  let tokenAddress = event.params.memeToken;
  let marketAddress = event.address;

  if (!isExistingVault(tokenAddress.toHexString())) {
    return;
  }

  let pool = getMaticLiquidityPool(
    tokenAddress.toHexString(),
    event.block.timestamp
  );

  let market = DankBankMarketGSN.bind(marketAddress);
  pool.tokenPoolSupply = market.tokenPoolSupply(tokenAddress);

  pool.totalVolume = pool.totalVolume.plus(event.params.investmentAmount);

  updateMaticTokenPrice(pool, marketAddress);

  pool.save();

  createTransaction(
    event.transaction.hash.toHex(),
    event.params.buyer.toHexString(),
    tokenAddress.toHexString(),
    event.params.investmentAmount,
    [event.params.tokensBought],
    TransactionType.BUY,
    event.block.timestamp
  ).save();
}

export function handleDankBankSell(event: DankBankSell): void {
  let tokenAddress = event.params.memeToken;
  let marketAddress = event.address;

  // subgraph only supports fractionalized tokens for now
  if (!isExistingVault(tokenAddress.toHexString())) {
    return;
  }

  let pool = getMaticLiquidityPool(
    tokenAddress.toHexString(),
    event.block.timestamp
  );

  let market = DankBankMarketGSN.bind(marketAddress);
  pool.tokenPoolSupply = market.tokenPoolSupply(tokenAddress);

  pool.totalVolume = pool.totalVolume.minus(event.params.returnAmount);

  updateMaticTokenPrice(pool, marketAddress);

  pool.save();

  createTransaction(
    event.transaction.hash.toHex(),
    event.params.seller.toHexString(),
    tokenAddress.toHexString(),
    event.params.tokensSold,
    [event.params.returnAmount],
    TransactionType.SELL,
    event.block.timestamp
  ).save();
}

export function handleLiquidityAdded(event: LiquidityAdded): void {
  let tokenAddress = event.params.memeToken;
  let marketAddress = event.address.toHexString();

  // subgraph only supports fractionalized tokens for now
  if (!isExistingVault(tokenAddress.toHexString())) {
    return;
  }

  let pool = getMaticLiquidityPool(
    tokenAddress.toHexString(),
    event.block.timestamp
  );

  let market = DankBankMarketGSN.bind(Address.fromString(marketAddress));
  pool.virtualTokenPoolSupply = market.virtualTokenPoolSupply(tokenAddress);
  pool.tokenPoolSupply = market.tokenPoolSupply(tokenAddress);

  pool.lpTokenSupply = market.lpTokenSupply(market.getTokenId(tokenAddress));

  updateMaticTokenPrice(pool, event.address);

  let userAddress = event.params.funder.toHexString();
  let lpTokenBalance = getLpTokenBalance(
    tokenAddress.toHexString(),
    userAddress
  );
  lpTokenBalance.balance = lpTokenBalance.balance.plus(
    event.params.sharesMinted
  );

  lpTokenBalance.save();
  pool.save();

  createTransaction(
    event.transaction.hash.toHex(),
    event.params.funder.toHexString(),
    tokenAddress.toHexString(),
    event.params.memeTokensAdded,
    [event.params.sharesMinted],
    TransactionType.ADD_LIQUIDITY,
    event.block.timestamp
  ).save();
}

export function handleLiquidityRemoved(event: LiquidityRemoved): void {
  let tokenAddress = event.params.memeToken;
  let marketAddress = event.address;

  // subgraph only supports fractionalized tokens for now
  if (!isExistingVault(tokenAddress.toHexString())) {
    return;
  }

  let pool = getMaticLiquidityPool(
    tokenAddress.toHexString(),
    event.block.timestamp
  );

  let market = DankBankMarketGSN.bind(marketAddress);
  pool.virtualTokenPoolSupply = market.virtualTokenPoolSupply(tokenAddress);
  pool.tokenPoolSupply = market.tokenPoolSupply(tokenAddress);
  pool.lpTokenSupply = market.lpTokenSupply(market.getTokenId(tokenAddress));

  let userAddress = event.params.funder.toHexString();
  let lpTokenBalance = getLpTokenBalance(
    tokenAddress.toHexString(),
    userAddress
  );
  lpTokenBalance.balance = lpTokenBalance.balance.minus(
    event.params.sharesBurnt
  );

  lpTokenBalance.save();
  pool.save();

  createTransaction(
    event.transaction.hash.toHex(),
    event.params.funder.toHexString(),
    tokenAddress.toHexString(),
    event.params.sharesBurnt,
    [event.params.memeTokensRemoved, event.params.paymentTokensRemoved],
    TransactionType.REMOVE_LIQUIDITY,
    event.block.timestamp
  ).save();
}

export function handleTransferBatch(event: TransferBatch): void {}

export function handleTransferSingle(event: TransferSingle): void {}

export function handleURI(event: URI): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}
