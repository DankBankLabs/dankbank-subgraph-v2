import { ByteArray, Address, BigInt } from "@graphprotocol/graph-ts";

import { LiquidityPool, LpTokenBalance } from "../../generated/schema";
import { bigZero, weiPerEth } from "./constants";
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

  liquidityPool.tokenPrice = tokenPrice;
}

export function updateTokenValuation(liquidityPool: LiquidityPool): void {
  let tokenVault = getTokenVault(liquidityPool.token);
  liquidityPool.tokenValuation = liquidityPool.tokenPrice.times(
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
    pool.ethPoolSupply = bigZero;
    pool.virtualEthPoolSupply = bigZero;
    pool.totalVolume = bigZero;
    pool.lpTokenSupply = bigZero;
    pool.tokenPrice = bigZero;
    pool.tokenValuation = bigZero;
    pool.createdAt = timestamp;
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
    ensureUserCreated(userAddress);
    balance = new LpTokenBalance(balanceId);
    balance.liquidityPool = tokenAddress;
    balance.user = userAddress;
    balance.balance = bigZero;
  }

  return balance;
}
