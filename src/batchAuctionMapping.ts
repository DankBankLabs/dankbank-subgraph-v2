import { Auction } from "../generated/schema";
import {
  BatchAuction,
  AddedCommitment,
  AuctionFinalized,
} from "../generated/templates/BatchAuction/BatchAuction";
import { TransactionType } from "./utils/constants";
import { createTransaction } from "./utils/transaction";

export function handleCommitEth(event: AddedCommitment): void {
  let contract = BatchAuction.bind(event.address);

  createTransaction(
    event.transaction.hash.toHex(),
    event.params.addr.toHexString(),
    contract.auctionToken().toHexString(),
    event.params.commitment,
    [event.params.commitment],
    TransactionType.COMMIT_TO_AUCTION,
    event.block.timestamp
  ).save();

  // increment Auction.commitmentsTotal
  let auction = Auction.load(event.address.toHexString());
  if (auction == null) {
    return;
  }
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
