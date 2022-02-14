import { Address } from "@graphprotocol/graph-ts";

import {
    Auction,
    MisoMarket,
} from "../../generated/schema";
import { BatchAuction } from "../../generated/templates/BatchAuction/BatchAuction";
import { bigZero } from "./constants";

export function createAuction(
    addr: Address,
    market: string,
  ): Auction {
    let auction = new Auction(addr.toHexString());
  
    let auctionContract = BatchAuction.bind(addr);
    let marketInfo = auctionContract.marketInfo();
  
    auction.startTime = marketInfo.value0;
    auction.endTime = marketInfo.value1;
    auction.tokensForAuction = marketInfo.value2;
    auction.minimumCommitmentAmount = auctionContract.marketStatus().value1;
  
    auction.finalized = false;
    auction.commitmentsTotal = bigZero;
    auction.market = market;
    return auction;
  }
  
  export function loadOrCreateMisoMarket(id: string): MisoMarket {
    let market = MisoMarket.load(id);
    if (market == null) {
      market = new MisoMarket(id);
      market.numberOfAuctions = bigZero;
    }
    return market as MisoMarket;
  }