import { Address, log } from "@graphprotocol/graph-ts";
import {
  DankBankMarket,
  TokenVault,
  DankBankBuy,
  DankBankSell,
  LiquidityAdded,
  LiquidityRemoved,
} from "../generated/DankBankMarket/DankBankMarket";
import { bigZero } from "./utils/constants";
import {
  calculateScaledPools,
  getLiquidityPool,
  getLpTokenBalance,
  updateTokenPrice,
  updateTokenValuation,
} from "./utils/market";
import { isExistingLiquidityPool } from "./utils/vault";

// TODO: Include math for LP fees
export function handleDankBankBuy(event: DankBankBuy): void {
  let { token: tokenAddress, tokensBought, investmentAmount } = event.params;
  let marketAddress = event.address;

  if (!isExistingLiquidityPool(tokenAddress.toHexString())) {
    return;
  }

  let pool = getLiquidityPool(
    tokenAddress.toHexString(),
    event.block.timestamp
  );

  const { 
    scaledPool0: newMemeMarketSupply,
    scaledPool1: newTokenPoolSupply
  } = calculateScaledPools(
    pool.memeMarketSupply.minus(tokensBought),
    pool.tokenPoolSupply.plus(investmentAmount)
  );
  
  pool.memeMarketSupply = newMemeMarketSupply;
  pool.tokenPoolSupply = newTokenPoolSupply;
  pool.totalVolume = pool.totalVolume.plus(investmentAmount);

  let tokenVault = TokenVault.bind(tokenAddress);
  tokenVault.balanceOf(marketAddress);

  updateTokenPrice(pool, tokenAddress, marketAddress);
  updateTokenValuation(pool);

  pool.save();
}

export function handleDankBankSell(event: DankBankSell): void {
  let { token: tokenAddress, tokensSold, returnAmount } = event.params.token;
  let marketAddress = event.address;

  if (!isExistingLiquidityPool(tokenAddress.toHexString())) {
    return;
  }

  let pool = getLiquidityPool(
    tokenAddress.toHexString(),
    event.block.timestamp
  );

  const { 
    scaledPool0: newMemeMarketSupply,
    scaledPool1: newTokenPoolSupply
  } = calculateScaledPools(
    pool.memeMarketSupply.plus(tokensSold),
    pool.tokenPoolSupply.sub(returnAmount)
  );

  pool.memeMarketSupply = newMemeMarketSupply;
  pool.tokenPoolSupply = newTokenPoolSupply;
  pool.totalVolume = pool.totalVolume.minus(event.params.returnAmount);

  updateTokenPrice(pool, tokenAddress, marketAddress);
  updateTokenValuation(pool);

  pool.save();
}

export function handleLiquidityAdded(event: LiquidityAdded): void {
  let tokenAddress = event.params.token;
  let marketAddress = Address.fromString(event.address.toHexString());

  let pool = getLiquidityPool(
    tokenAddress.toHexString(),
    event.block.timestamp
  );
  
  let tokenVault = TokenVault.bind(tokenAddress);
  if (bigZero.equals(pool.memeMarketSupply)) {
    pool.memeTotalSupply = tokenVault.totalSupply();
    pool.name = tokenVault.name();
    pool.symbol = tokenVault.symbol();
  }
  pool.memeMarketSupply = tokenVault.balanceOf(marketAddress);

  let market = DankBankMarket.bind(marketAddress);
  pool.virtualTokenPoolSupply = market.virtualEthPoolSupply(tokenAddress);
  pool.tokenPoolSupply = market.ethPoolSupply(tokenAddress);
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
}

export function handleLiquidityRemoved(event: LiquidityRemoved): void {
  let tokenAddress = event.params.token;
  let marketAddress = event.address;

  if (!isExistingLiquidityPool(tokenAddress.toHexString())) {
    return;
  }

  let pool = getLiquidityPool(
    tokenAddress.toHexString(),
    event.block.timestamp
  );

  let tokenVault = TokenVault.bind(tokenAddress);
  pool.memeMarketSupply = tokenVault.balanceOf(marketAddress);

  let market = DankBankMarket.bind(marketAddress);
  pool.virtualTokenPoolSupply = market.virtualEthPoolSupply(tokenAddress);
  pool.tokenPoolSupply = market.ethPoolSupply(tokenAddress);
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
}
