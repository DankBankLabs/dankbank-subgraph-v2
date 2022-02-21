import { LiquidityPool } from "../../generated/schema";

export function isExistingLiquidityPool(address: string): boolean {
  const lp = LiquidityPool.load(address);

  return lp != null;
}
