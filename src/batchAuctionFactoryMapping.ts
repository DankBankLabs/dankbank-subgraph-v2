import { MarketCreated } from "../generated/BatchAuctionFactory/MISOMarket";
import { BatchAuction } from "../generated/templates";

import { bigOne } from "./utils/constants";
import { createAuction, loadOrCreateMisoMarket } from "./utils/miso";


export function handleCreateMarket(event: MarketCreated): void {
  BatchAuction.create(event.params.addr);

  // increment number of auction
  let misoMarket = loadOrCreateMisoMarket(event.address.toHexString());
  misoMarket.numberOfAuctions = misoMarket.numberOfAuctions.plus(bigOne);
  misoMarket.save();

  // create Auction entity
  createAuction(event.params.addr, misoMarket.id).save();
}
