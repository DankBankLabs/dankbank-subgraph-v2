import { Address } from "@graphprotocol/graph-ts";
import {
  DankBankMarketGSN,
  DankBankBuy,
  DankBankSell,
  LiquidityAdded,
  LiquidityRemoved,
} from "../generated/DankBankMarketGSN/DankBankMarketGSN";
import { ERC20 as ERC20Contract } from "../generated/DankBankMarket/ERC20";
import { bigZero, TransactionType } from "./utils/constants";
import { getLiquidityPool, getLpTokenBalance, updateTokenPrice, updateTokenValuation } from "./utils/market";
import { createTransaction } from "./utils/transaction";
import { isExistingLiquidityPool } from "./utils/vault";

export function handleDankBankBuy(event: DankBankBuy): void {
  const tokenAddress = event.params.memeToken;
  const tokensBought = event.params.tokensBought;
  const investmentAmount = event.params.investmentAmount;

  if (!isExistingLiquidityPool(tokenAddress.toHexString())) {
    return;
  }

  let pool = getLiquidityPool(tokenAddress.toHexString(), event.block.timestamp);

  (pool.memeMarketSupply = pool.memeMarketSupply.minus(tokensBought)),
    (pool.tokenPoolSupply = pool.tokenPoolSupply.plus(investmentAmount));
  pool.totalVolume = pool.totalVolume.plus(investmentAmount);

  updateTokenPrice(pool);
  updateTokenValuation(pool);

  pool.save();

  createTransaction(
    event.transaction.hash.toHex(),
    event.params.buyer.toHexString(),
    pool.id,
    event.params.investmentAmount,
    [event.params.tokensBought],
    TransactionType.BUY,
    event.block.timestamp,
  ).save();
}

export function handleDankBankSell(event: DankBankSell): void {
  const tokenAddress = event.params.memeToken;
  const tokensSold = event.params.tokensSold;
  const returnAmount = event.params.returnAmount;

  if (!isExistingLiquidityPool(tokenAddress.toHexString())) {
    return;
  }

  let pool = getLiquidityPool(tokenAddress.toHexString(), event.block.timestamp);

  pool.memeMarketSupply = pool.memeMarketSupply.plus(tokensSold);
  pool.tokenPoolSupply = pool.tokenPoolSupply.minus(returnAmount);
  pool.totalVolume = pool.totalVolume.plus(returnAmount);

  updateTokenPrice(pool);
  updateTokenValuation(pool);

  pool.save();

  createTransaction(
    event.transaction.hash.toHex(),
    event.params.seller.toHexString(),
    pool.id,
    event.params.tokensSold,
    [event.params.returnAmount],
    TransactionType.SELL,
    event.block.timestamp,
  ).save();
}

export function handleLiquidityAdded(event: LiquidityAdded): void {
  let tokenAddress = event.params.memeToken;
  let marketAddress = Address.fromString(event.address.toHexString());

  let pool = getLiquidityPool(tokenAddress.toHexString(), event.block.timestamp);

  let ERC20 = ERC20Contract.bind(tokenAddress);
  if (bigZero.equals(pool.memeMarketSupply)) {
    pool.memeTotalSupply = ERC20.totalSupply();
    pool.name = ERC20.name();
    pool.symbol = ERC20.symbol();
  }
  pool.memeMarketSupply = ERC20.balanceOf(marketAddress);

  let market = DankBankMarketGSN.bind(marketAddress);
  pool.virtualTokenPoolSupply = market.virtualTokenPoolSupply(tokenAddress);
  pool.tokenPoolSupply = market.tokenPoolSupply(tokenAddress);
  pool.lpTokenSupply = market.lpTokenSupply(market.getTokenId(tokenAddress));

  updateTokenPrice(pool);
  updateTokenValuation(pool);

  let userAddress = event.params.funder.toHexString();
  let lpTokenBalance = getLpTokenBalance(tokenAddress.toHexString(), userAddress);
  lpTokenBalance.balance = lpTokenBalance.balance.plus(event.params.sharesMinted);

  lpTokenBalance.save();
  pool.save();

  createTransaction(
    event.transaction.hash.toHex(),
    event.params.funder.toHexString(),
    pool.id,
    event.params.memeTokensAdded,
    [event.params.sharesMinted],
    TransactionType.ADD_LIQUIDITY,
    event.block.timestamp,
  ).save();
}

export function handleLiquidityRemoved(event: LiquidityRemoved): void {
  let tokenAddress = event.params.memeToken;
  let marketAddress = event.address;

  if (!isExistingLiquidityPool(tokenAddress.toHexString())) {
    return;
  }

  let pool = getLiquidityPool(tokenAddress.toHexString(), event.block.timestamp);

  let ERC20 = ERC20Contract.bind(tokenAddress);
  pool.memeMarketSupply = ERC20.balanceOf(marketAddress);

  let market = DankBankMarketGSN.bind(marketAddress);
  pool.virtualTokenPoolSupply = market.virtualTokenPoolSupply(tokenAddress);
  pool.tokenPoolSupply = market.tokenPoolSupply(tokenAddress);
  pool.lpTokenSupply = market.lpTokenSupply(market.getTokenId(tokenAddress));

  let userAddress = event.params.funder.toHexString();
  let lpTokenBalance = getLpTokenBalance(tokenAddress.toHexString(), userAddress);
  lpTokenBalance.balance = lpTokenBalance.balance.minus(event.params.sharesBurnt);

  updateTokenPrice(pool);
  updateTokenValuation(pool);

  lpTokenBalance.save();
  pool.save();

  createTransaction(
    event.transaction.hash.toHex(),
    event.params.funder.toHexString(),
    pool.id,
    event.params.sharesBurnt,
    [event.params.memeTokensRemoved, event.params.paymentTokensRemoved],
    TransactionType.REMOVE_LIQUIDITY,
    event.block.timestamp,
  ).save();
}
