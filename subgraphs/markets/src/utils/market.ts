import { ByteArray, Address, BigInt } from "@graphprotocol/graph-ts";

import { LiquidityPool, LpTokenBalance } from "../../generated/schema";
import { bigZero, weiPerEth } from "../../../../packages/constants";
import { ERC721TokenVault } from "../../generated/templates/ERC721TokenVault/ERC721TokenVault";
import { DankBankMarket } from "../../generated/DankBankMarket/DankBankMarket";
import { ensureUserCreated } from "./user";
import { getTokenVault } from "./vault";

export function updateTokenPrice(
  liquidityPool: LiquidityPool,
  tokenAddress: Address,
  marketAddress: Address
): void {
  let marketContract = DankBankMarket.bind(marketAddress);
  let ethAndVirtualPoolSupply =
    marketContract.getTotalEthPoolSupply(tokenAddress);

  let tokenContract = ERC721TokenVault.bind(tokenAddress);
  let tokenPoolSupply = tokenContract.balanceOf(marketAddress);
  let tokenPrice = tokenPoolSupply.gt(bigZero)
    ? ethAndVirtualPoolSupply.times(weiPerEth).div(tokenPoolSupply)
    : bigZero;

  liquidityPool.memeTokenPrice = tokenPrice;
}

export function updateTokenValuation(liquidityPool: LiquidityPool): void {
  let tokenVault = getTokenVault(liquidityPool.token);
  liquidityPool.memeValuation = liquidityPool.tokenPrice.times(
    tokenVault.totalSupply.div(weiPerEth)
  );
}

export function getLiquidityPool(
  tokenAddress: string,
  timestamp: BigInt
): LiquidityPool {
  let lpId = tokenAddress;

  let pool = LiquidityPool.load(lpId);
  if (pool == null) {
    pool = new LiquidityPool(lpId);
    pool.token = tokenAddress;
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

export function getLpTokenBalance(
  tokenAddress: string,
  userAddress: string
): LpTokenBalance {
  let balanceId = tokenAddress + userAddress;

  let balance = LpTokenBalance.load(balanceId);
  if (balance == null) {
    balance = new LpTokenBalance(balanceId);
    balance.liquidityPool = tokenAddress;
    balance.balance = bigZero;
  }

  return balance;
}

type ScaledPools = {
  scaledPool0: BigInt,
  scaledPool1: BigInt
}

// TODO finish this logic
export function calculateScaledPools(
  pool0: BigInt,
  pool1: BigInt,
): ScaledPools {
  return {
    scaledPool0: pool0,
    scaledPool1: pool1,
  };
}

