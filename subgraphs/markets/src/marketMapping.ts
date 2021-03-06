import { Address } from "@graphprotocol/graph-ts";
import {
  DankBankMarket,
  DankBankBuy,
  DankBankSell,
  LiquidityAdded,
  LiquidityRemoved,
  TransferSingle,
} from "../generated/DankBankMarket/DankBankMarket";
import { ERC20 as ERC20Contract } from "../generated/DankBankMarket/ERC20";
import { bigZero, TransactionType } from "./utils/constants";
import { getLiquidityPool, getLpTokenBalance, updateTokenPrice, updateTokenValuation } from "./utils/market";
import { createTransaction } from "./utils/transaction";
import { isExistingLiquidityPool } from "./utils/vault";

export function handleDankBankBuy(event: DankBankBuy): void {
  const tokenAddress = event.params.token;
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
  const tokenAddress = event.params.token;
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
  let tokenAddress = event.params.token;
  let marketAddress = Address.fromString(event.address.toHexString());

  let pool = getLiquidityPool(tokenAddress.toHexString(), event.block.timestamp);

  let ERC20 = ERC20Contract.bind(tokenAddress);
  if (bigZero.equals(pool.memeMarketSupply)) {
    pool.memeTotalSupply = ERC20.totalSupply();
    pool.name = ERC20.name();
    pool.symbol = ERC20.symbol();
  }
  pool.memeMarketSupply = ERC20.balanceOf(marketAddress);

  let market = DankBankMarket.bind(marketAddress);
  pool.virtualTokenPoolSupply = market.virtualEthPoolSupply(tokenAddress);
  pool.tokenPoolSupply = market.ethPoolSupply(tokenAddress);
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
    event.params.amountAdded,
    [event.params.sharesMinted],
    TransactionType.ADD_LIQUIDITY,
    event.block.timestamp,
  ).save();
}

export function handleLiquidityRemoved(event: LiquidityRemoved): void {
  let tokenAddress = event.params.token;
  let marketAddress = event.address;

  if (!isExistingLiquidityPool(tokenAddress.toHexString())) {
    return;
  }

  let pool = getLiquidityPool(tokenAddress.toHexString(), event.block.timestamp);

  let ERC20 = ERC20Contract.bind(tokenAddress);
  pool.memeMarketSupply = ERC20.balanceOf(marketAddress);

  let market = DankBankMarket.bind(marketAddress);
  pool.virtualTokenPoolSupply = market.virtualEthPoolSupply(tokenAddress);
  pool.tokenPoolSupply = market.ethPoolSupply(tokenAddress);
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
    [event.params.tokensRemoved, event.params.ethRemoved],
    TransactionType.REMOVE_LIQUIDITY,
    event.block.timestamp,
  ).save();
}

export function handleLPTokenTransfer(event: TransferSingle): void {
  let tokenAddress = Address.fromBigInt(event.params.id);

  let lpTokenBalanceFrom = getLpTokenBalance(tokenAddress.toHexString(), event.params.from.toHexString());
  let lpTokenBalanceTo = getLpTokenBalance(tokenAddress.toHexString(), event.params.to.toHexString());

  lpTokenBalanceFrom.balance = lpTokenBalanceFrom.balance.minus(event.params.value);
  lpTokenBalanceTo.balance = lpTokenBalanceTo.balance.plus(event.params.value);

  lpTokenBalanceFrom.save();
  lpTokenBalanceTo.save();
}
