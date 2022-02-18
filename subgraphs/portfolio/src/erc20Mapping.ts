import { AddressZero, bigZero } from "./utils/constants";
import { ensureAccountCreated } from "./utils/accounts";
import { Transfer } from "../generated/10Guy/ERC20";
import { TokenBalance } from "../generated/schema";
import { log } from "@graphprotocol/graph-ts";

export function handleTransfer(event: Transfer): void {
  log.error("handleTransfer {}", [event.address.toHexString()]);
  const tokenAddress = event.address.toHexString();
  const value = event.params.value;

  // add value to to
  const toAddress = event.params.to.toHexString();

  // when burning a token the to Address is the 0 address in the event
  if (toAddress != AddressZero) {
    ensureAccountCreated(toAddress);

    const toBalance = getTokenBalance(tokenAddress, toAddress);

    toBalance.balance = toBalance.balance.plus(value);

    toBalance.save();
  }

  const fromAddress = event.params.from.toHexString();

  // when minting a token the from address is the 0 address in the event
  if (fromAddress != AddressZero) {
    ensureAccountCreated(fromAddress);

    const fromBalance = getTokenBalance(tokenAddress, fromAddress);

    fromBalance.balance = fromBalance.balance.minus(value);

    fromBalance.save();
  }
}

function getTokenBalance(tokenAddress: string, user: string): TokenBalance {
  const balanceId = tokenAddress + user;
  let tokenBalance = TokenBalance.load(balanceId);
  if (tokenBalance == null) {
    tokenBalance = new TokenBalance(balanceId);
    tokenBalance.token = tokenAddress;
    tokenBalance.user = user;
    tokenBalance.balance = bigZero;
  }

  return tokenBalance as TokenBalance;
}
