import { Auction } from "../generated/schema";
import {
  BatchAuction,
  AddedCommitment,
  AuctionFinalized,
} from "../generated/templates/BatchAuction/BatchAuction";

export function handleCommitEth(event: AddedCommitment): void {
  let contract = BatchAuction.bind(event.address);

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
