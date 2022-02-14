import { ByteArray, Address, BigInt } from "@graphprotocol/graph-ts";

import { LpTokenBalance, MaticLiquidityPool } from "../../generated/schema";
import { bigZero, weiPerEth } from "./constants";
import { ERC721TokenVault } from "../../generated/templates/ERC721TokenVault/ERC721TokenVault";
import { DankBankMarketGSN } from "../../generated/DankBankMarketGSN/DankBankMarketGSN";
import { ensureUserCreated } from "./user";

export function updateMaticTokenPrice(
  liquidityPool: MaticLiquidityPool,
  marketAddress: Address
): void {
  let tokenAddress = ByteArray.fromHexString(liquidityPool.token);

  let marketContract = DankBankMarketGSN.bind(marketAddress);
  let paymentTokenPoolSupply = marketContract.getTotalTokenPoolSupply(
    tokenAddress as Address
  );

  let tokenContract = ERC721TokenVault.bind(tokenAddress as Address);
  let tokenPoolSupply = tokenContract.balanceOf(marketAddress);
  let tokenPrice = tokenPoolSupply.gt(bigZero)
    ? paymentTokenPoolSupply.times(weiPerEth).div(tokenPoolSupply)
    : bigZero;

  liquidityPool.tokenPrice = tokenPrice;
}

export function getMaticLiquidityPool(
  tokenAddress: string,
  timestamp: BigInt
): MaticLiquidityPool {
  let lpId = tokenAddress;

  let pool = MaticLiquidityPool.load(lpId);
  if (pool == null) {
    pool = new MaticLiquidityPool(lpId);
    pool.token = tokenAddress;
    pool.tokenPoolSupply = bigZero;
    pool.virtualTokenPoolSupply = bigZero;
    pool.totalVolume = bigZero;
    pool.lpTokenSupply = bigZero;
    pool.tokenPrice = bigZero;
    pool.createdAt = timestamp;
  }

  return pool as MaticLiquidityPool;
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

  return balance as LpTokenBalance;
}
