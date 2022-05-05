import { MerkleClaimERC20, Claim } from "../generated/templates/MerkleClaimERC20/MerkleClaimERC20";
import { TransactionType } from "./utils/constants";
import { getLiquidityPool } from "./utils/market";
import { createTransaction } from "./utils/transaction";
import { BigInt } from "@graphprotocol/graph-ts";

export function handleClaim(event: Claim): void {
  let contract = MerkleClaimERC20.bind(event.address);

  let pool = getLiquidityPool(
    contract.memeTokenAddress().toHexString(),
    event.block.timestamp
  );
  if (pool.createdAt.equals(event.block.timestamp)) {
    // save created pool as getLiquidityPool doesn't save
    pool.save();
  }

  createTransaction(
    event.transaction.hash.toHex(),
    event.params.to.toHexString(),
    pool.id,
    BigInt.fromI32(0), // gotten for free
    [event.params.amount],
    TransactionType.CLAIM_FROM_AIRDROP,
    event.block.timestamp,
  ).save();
}
