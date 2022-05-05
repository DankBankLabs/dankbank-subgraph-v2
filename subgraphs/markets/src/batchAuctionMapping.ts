import { Auction } from "../generated/schema";
import {
  BatchAuction,
  AddedCommitment,
  AuctionFinalized,
  WithdrawTokensCall,
} from "../generated/templates/BatchAuction/BatchAuction";
import { TransactionType } from "./utils/constants";
import { getLiquidityPool } from "./utils/market";
import { createTransaction } from "./utils/transaction";
import { BigInt } from "@graphprotocol/graph-ts";

export function handleCommitEth(event: AddedCommitment): void {
  let contract = BatchAuction.bind(event.address);

  let auction = Auction.load(event.address.toHexString());
  if (auction == null) {
    return;
  }
  let pool = getLiquidityPool(
    contract.auctionToken().toHexString(),
    event.block.timestamp
  );

  createTransaction(
    event.transaction.hash.toHex(),
    event.params.addr.toHexString(),
    pool.id,
    event.params.commitment,
    [event.params.commitment],
    TransactionType.COMMIT_TO_AUCTION,
    event.block.timestamp,
  ).save();

  // increment Auction.commitmentsTotal
  auction.commitmentsTotal = auction.commitmentsTotal.plus(
    event.params.commitment
  );
  auction.save();
}

export function handleAuctionFinalized(event: AuctionFinalized): void {
  let auction = Auction.load(event.address.toHexString());
  if (auction == null) {
    return;
  }
  auction.finalized = true;
  auction.save();
}

export function handleWithdrawTokens(call: WithdrawTokensCall): void {
  let userAddress = call.inputs.beneficiary;
  let contract = BatchAuction.bind(call.to);

  let ZERO = BigInt.fromI32(0);
  let try_claimed = contract.try_claimed(userAddress);
  let claimed = try_claimed.reverted ? ZERO : try_claimed.value;
  let try_commitment = contract.try_commitments(userAddress);
  let commitment = try_commitment.reverted ? ZERO : try_commitment.value;
  if (!(claimed.gt(ZERO) && commitment.gt(ZERO))) return;

  let pool = getLiquidityPool(
    contract.auctionToken().toHexString(),
    call.block.timestamp
  );
  if (pool.createdAt.equals(call.block.timestamp)) {
    // save created pool as getLiquidityPool doesn't save
    pool.save();
  }

  createTransaction(
    call.transaction.hash.toHex(),
    userAddress.toHexString(),
    pool.id,
    commitment,
    [claimed],
    TransactionType.CLAIM_FROM_AUCTION,
    call.block.timestamp,
  ).save();
}
