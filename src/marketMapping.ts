import { Address, log } from "@graphprotocol/graph-ts";
import {
  DankBankMarket,
  ApprovalForAll,
  DankBankBuy,
  DankBankSell,
  LiquidityAdded,
  LiquidityRemoved,
  TransferBatch,
  TransferSingle,
  URI,
} from "../generated/DankBankMarket/DankBankMarket";
import { TransactionType } from "./utils/constants";
import {
  getLiquidityPool,
  getLpTokenBalance,
  updateTokenPrice,
  updateTokenValuation,
} from "./utils/market";
import { createTransaction } from "./utils/transaction";
import { isExistingVault } from "./utils/vault";

export function handleDankBankBuy(event: DankBankBuy): void {
  let tokenAddress = event.params.token;
  let marketAddress = event.address;

  // subgraph only supports fractionalized tokens for now
  if (!isExistingVault(tokenAddress.toHexString())) {
    return;
  }

  let pool = getLiquidityPool(
    tokenAddress.toHexString(),
    event.block.timestamp
  );

  let market = DankBankMarket.bind(marketAddress);
  pool.ethPoolSupply = market.ethPoolSupply(tokenAddress);

  pool.totalVolume = pool.totalVolume.plus(event.params.investmentAmount);

  updateTokenPrice(pool, tokenAddress, marketAddress);
  updateTokenValuation(pool);

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
  let tokenAddress = event.params.token;
  let marketAddress = event.address;

  // subgraph only supports fractionalized tokens for now
  if (!isExistingVault(tokenAddress.toHexString())) {
    return;
  }

  let pool = getLiquidityPool(
    tokenAddress.toHexString(),
    event.block.timestamp
  );

  let market = DankBankMarket.bind(marketAddress);
  pool.ethPoolSupply = market.ethPoolSupply(tokenAddress);

  pool.totalVolume = pool.totalVolume.minus(event.params.returnAmount);

  updateTokenPrice(pool, tokenAddress, marketAddress);
  updateTokenValuation(pool);

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
  let tokenAddress = event.params.token;
  let marketAddress = event.address.toHexString();

  // subgraph only supports fractionalized tokens for now
  if (!isExistingVault(tokenAddress.toHexString())) {
    return;
  }

  let pool = getLiquidityPool(
    tokenAddress.toHexString(),
    event.block.timestamp
  );

  let market = DankBankMarket.bind(Address.fromString(marketAddress));
  pool.virtualEthPoolSupply = market.virtualEthPoolSupply(tokenAddress);
  pool.ethPoolSupply = market.ethPoolSupply(tokenAddress);

  pool.lpTokenSupply = market.lpTokenSupply(market.getTokenId(tokenAddress));

  updateTokenPrice(pool, tokenAddress, event.address);
  updateTokenValuation(pool);

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
    event.params.amountAdded,
    [event.params.sharesMinted],
    TransactionType.ADD_LIQUIDITY,
    event.block.timestamp
  ).save();
}

export function handleLiquidityRemoved(event: LiquidityRemoved): void {
  let tokenAddress = event.params.token;
  let marketAddress = event.address;

  // subgraph only supports fractionalized tokens for now
  if (!isExistingVault(tokenAddress.toHexString())) {
    return;
  }

  let pool = getLiquidityPool(
    tokenAddress.toHexString(),
    event.block.timestamp
  );

  let market = DankBankMarket.bind(marketAddress);
  pool.virtualEthPoolSupply = market.virtualEthPoolSupply(tokenAddress);
  pool.ethPoolSupply = market.ethPoolSupply(tokenAddress);
  pool.lpTokenSupply = market.lpTokenSupply(market.getTokenId(tokenAddress));

  let userAddress = event.params.funder.toHexString();
  let lpTokenBalance = getLpTokenBalance(
    tokenAddress.toHexString(),
    userAddress
  );
  lpTokenBalance.balance = lpTokenBalance.balance.minus(
    event.params.sharesBurnt
  );

  updateTokenPrice(pool, tokenAddress, event.address);
  updateTokenValuation(pool);

  lpTokenBalance.save();
  pool.save();

  createTransaction(
    event.transaction.hash.toHex(),
    event.params.funder.toHexString(),
    tokenAddress.toHexString(),
    event.params.sharesBurnt,
    [event.params.tokensRemoved, event.params.ethRemoved],
    TransactionType.REMOVE_LIQUIDITY,
    event.block.timestamp
  ).save();
}

export function handleTransferBatch(event: TransferBatch): void {}

export function handleTransferSingle(event: TransferSingle): void {}

export function handleURI(event: URI): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}
