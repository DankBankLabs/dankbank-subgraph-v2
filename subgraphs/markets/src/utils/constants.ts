import { BigInt } from "@graphprotocol/graph-ts";

export const bigZero = BigInt.fromI32(0);
export const bigOne = BigInt.fromI32(1);
export const weiPerEth = BigInt.fromI32(10).pow(18);

export const AddressZero = "0x0000000000000000000000000000000000000000";

/**
 * hack used to mimic the usage of enum without build error.
 * Replace with a more suitable alternative
 */
class NamedObject {
  private readonly name: string;
  protected constructor(name: string) {
    this.name = name;
  }

  toString(): string {
    return this.name;
  }
}

export class TransactionType extends NamedObject {
  static readonly BUY: TransactionType = new TransactionType("BUY");
  static readonly SELL: TransactionType = new TransactionType("SELL");
  static readonly ADD_LIQUIDITY: TransactionType = new TransactionType(
    "ADD_LIQUIDITY"
  );
  static readonly REMOVE_LIQUIDITY: TransactionType = new TransactionType(
    "REMOVE_LIQUIDITY"
  );
  static readonly COMMIT_TO_AUCTION: TransactionType = new TransactionType(
    "COMMIT_TO_AUCTION"
  );
  static readonly CLAIM_FROM_AUCTION: TransactionType = new TransactionType(
    "CLAIM_FROM_AUCTION"
  );
}
