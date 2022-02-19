import {
  Bid,
  ERC721TokenVault,
  InitializeCall,
  KickCuratorCall,
  PriceUpdate,
  Redeem,
  Start,
  UpdateCuratorCall,
  UpdateFeeCall,
  Won,
} from "../generated/templates/ERC721TokenVault/ERC721TokenVault";
import { bigZero, AuctionState } from "./utils/constants";
import { getTokenVault } from "./utils/vault";
import { ensureUserCreated } from "./utils/user";

export function handleStart(event: Start): void {
  let tokenVault = getTokenVault(event.address.toHexString());

  // update auction state to 'live'
  tokenVault.auctionState = AuctionState.live.toString();
  // update livePrice
  tokenVault.livePrice = event.params.price;
  // update winningAccount
  const buyerAddress = event.params.buyer.toHexString();
  ensureUserCreated(buyerAddress);
  tokenVault.winningAccount = buyerAddress;

  tokenVault.save();
}

export function handleWon(event: Won): void {
  // update auction state to 'ended'
  let tokenVault = getTokenVault(event.address.toHexString());
  tokenVault.auctionState = AuctionState.ended.toString();
  tokenVault.save();
}

export function handleRedeem(event: Redeem): void {
  // update auction state to 'redeemed'
  let tokenVault = getTokenVault(event.address.toHexString());

  // When the NFT is redeemed the total supply of tokens is burned
  // This is the only way tokens can be burned since _transfer in ERC20 checks to make sure you
  // Do not send tokens to the zero address
  tokenVault.totalSupply = bigZero;
  tokenVault.auctionState = AuctionState.redeemed.toString();
  tokenVault.save();
}

export function handleBid(event: Bid): void {
  let tokenVault = getTokenVault(event.address.toHexString());

  // update livePrice
  tokenVault.livePrice = event.params.price;
  // update winningAccount
  const buyerAddress = event.params.buyer.toHexString();
  ensureUserCreated(buyerAddress);
  tokenVault.winningAccount = buyerAddress;

  tokenVault.save();
}

export function handlePriceUpdate(event: PriceUpdate): void {
  // update reserve price
  let tokenVault = getTokenVault(event.address.toHexString());
  let tokenVaultContract = ERC721TokenVault.bind(event.address);
  tokenVault.reservePrice = tokenVaultContract.reservePrice();
  tokenVault.save();
}

export function handleInitialize(call: InitializeCall): void {
  let tokenVault = getTokenVault(call.from.toHexString());

  // set curator
  const curatorAddress = call.inputs._curator.toHexString();
  ensureUserCreated(curatorAddress);
  tokenVault.curator = curatorAddress;
  // set fee
  tokenVault.fee = call.inputs._fee;
  // set auction state
  tokenVault.auctionState = AuctionState.inactive.toString();

  tokenVault.save();
}

export function handleKickCurator(call: KickCuratorCall): void {
  // replace curator
  let tokenVault = getTokenVault(call.from.toHexString());
  const curatorAddress = call.inputs._curator.toHexString();
  ensureUserCreated(curatorAddress);
  tokenVault.curator = curatorAddress;
  tokenVault.save();
}

export function handleUpdateCurator(call: UpdateCuratorCall): void {
  // update curator
  let tokenVault = getTokenVault(call.from.toHexString());
  const curatorAddress = call.inputs._curator.toHexString();
  ensureUserCreated(curatorAddress);
  tokenVault.curator = curatorAddress;
  tokenVault.save();
}

export function handleUpdateFee(call: UpdateFeeCall): void {
  // update fee
  let tokenVault = getTokenVault(call.from.toHexString());

  tokenVault.fee = call.inputs._fee;
  tokenVault.save();
}
