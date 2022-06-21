import { BigInt } from "@graphprotocol/graph-ts";

import { LiquidityPool, LpTokenBalance } from "../../generated/schema";
import { bigZero, weiPerEth } from "./constants";

export function updateTokenPrice(liquidityPool: LiquidityPool): void {
  let ethAndVirtualPoolSupply = liquidityPool.virtualTokenPoolSupply.plus(liquidityPool.tokenPoolSupply);

  let memeMarketSupply = liquidityPool.memeMarketSupply;
  let tokenPrice = memeMarketSupply.gt(bigZero)
    ? ethAndVirtualPoolSupply.times(weiPerEth).div(memeMarketSupply)
    : bigZero;

  liquidityPool.memeTokenPrice = tokenPrice;
}

export function updateTokenValuation(liquidityPool: LiquidityPool): void {
  liquidityPool.memeValuation = liquidityPool.memeTokenPrice.times(liquidityPool.memeTotalSupply).div(weiPerEth);
}

export function getLiquidityPool(tokenAddress: string, timestamp: BigInt): LiquidityPool {
  let lpId = tokenAddress;

  let pool = LiquidityPool.load(lpId);
  if (pool == null) {
    pool = new LiquidityPool(lpId);
    pool.id = tokenAddress;
    pool.tokenPoolSupply = bigZero;
    pool.virtualTokenPoolSupply = bigZero;
    pool.totalVolume = bigZero;
    pool.lpTokenSupply = bigZero;
    pool.memeTokenPrice = bigZero;
    pool.memeValuation = bigZero;
    pool.memeTotalSupply = bigZero;
    pool.memeMarketSupply = bigZero;
    pool.createdAt = timestamp;
    pool.symbol = "";
    pool.name = "";
  }

  return pool;
}

export function getLpTokenBalance(tokenAddress: string, userAddress: string): LpTokenBalance {
  let balanceId = tokenAddress + userAddress;

  let balance = LpTokenBalance.load(balanceId);
  if (balance == null) {
    balance = new LpTokenBalance(balanceId);
    balance.liquidityPool = tokenAddress;
    balance.balance = bigZero;
  }

  return balance;
}

// TODO finish this logic
export function updateTokenPools(lp: LiquidityPool, pool0: BigInt, pool1: BigInt): void {
  lp.memeMarketSupply = pool0;
  lp.tokenPoolSupply = pool1;
}
