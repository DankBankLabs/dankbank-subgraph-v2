import { Address, BigInt } from "@graphprotocol/graph-ts";

import { LiquidityPool, TokenVault } from "../../generated/schema";
import { ERC721TokenVault } from "../../generated/templates/ERC721TokenVault/ERC721TokenVault";
import { bigZero } from "../../../../packages/constants";

export function getTokenVault(address: string): TokenVault {
  let vault = TokenVault.load(address);

  if (vault == null) {
    vault = new TokenVault(address);
    vault.totalSupply = bigZero;

    let vaultContract = ERC721TokenVault.bind(Address.fromString(address));
    let symbolResult = vaultContract.try_symbol();
    let nameResult = vaultContract.try_name();
    let decimalsResult = vaultContract.try_decimals();
    vault.symbol = symbolResult.reverted ? "<reverted>" : symbolResult.value;
    vault.name = nameResult.reverted ? "<reverted>" : nameResult.value;
    vault.decimals = BigInt.fromI32(
      decimalsResult.reverted ? 0 : decimalsResult.value
    );

    vault.save();
  }

  return vault as TokenVault;
}

export function isExistingLiquidityPool(address: string): boolean {
  const lp = LiquidityPool.load(address);

  return lp != null;
}
