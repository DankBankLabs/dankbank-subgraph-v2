import {
  Bid,
  ERC721TokenVault,
  InitializeCall,
  KickCuratorCall,
  PriceUpdate,
  Redeem,
  Start,
  Transfer,
  UpdateCuratorCall,
  UpdateFeeCall,
  Won,
} from "../generated/templates/ERC721TokenVault/ERC721TokenVault";
import { TokenBalance } from "../generated/schema";
import { bigZero, AddressZero, AuctionState } from "./utils/constants";
import { getTokenVault } from "./utils/vault";
import { ensureUserCreated } from "./utils/user";
import { log } from "@graphprotocol/graph-ts";

function getTokenBalance(tokenAddress: string, user: string): TokenBalance {
  let balanceId = tokenAddress + user;
  let tokenBalance = TokenBalance.load(balanceId);
  if (tokenBalance == null) {
    tokenBalance = new TokenBalance(balanceId);
    tokenBalance.token = tokenAddress;
    tokenBalance.user = user;
    tokenBalance.balance = bigZero;
  }

  return tokenBalance as TokenBalance;
}

export function handleTransfer(event: Transfer): void {
  let tokenAddress = event.address.toHexString();
  let value = event.params.value;

  let tokenVault = getTokenVault(tokenAddress);

  // add value to to
  let toAddress = event.params.to.toHexString();

  // when burning a token the to Address is the 0 address in the event
  if (toAddress != AddressZero) {
    ensureUserCreated(toAddress);

    let toBalance = getTokenBalance(tokenAddress, toAddress);

    toBalance.balance = toBalance.balance.plus(value);

    toBalance.save();
  } else {
    // tokens were burned
    tokenVault.totalSupply = tokenVault.totalSupply.minus(value);
  }

  let fromAddress = event.params.from.toHexString();

  // when minting a token the from address is the 0 address in the event
  if (fromAddress != AddressZero) {
    ensureUserCreated(fromAddress);

    let fromBalance = getTokenBalance(tokenAddress, fromAddress);

    fromBalance.balance = fromBalance.balance.minus(value);

    fromBalance.save();
  } else {
    // the tokens were minted if they were from the 0 address
    tokenVault.totalSupply = tokenVault.totalSupply.plus(value);
  }

  // update reserve price
  let tokenVaultContract = ERC721TokenVault.bind(event.address);
  tokenVault.reservePrice = tokenVaultContract.reservePrice();

  tokenVault.save();
}

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
  log.info(`UpdateFeeCall: ${call.from.toHexString()}`, []);
  let tokenVault = getTokenVault(call.from.toHexString());
  log.info(`UpdateFeeCall -> tokenVault: ${tokenVault.id}`, []);

  tokenVault.fee = call.inputs._fee;
  tokenVault.save();
}
