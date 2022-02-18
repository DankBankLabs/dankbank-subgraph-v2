import { bigZero } from "../../utils/constants";
import { AddressZero } from "../../utils/constants";

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

export function handleTransfer(event: Transfer): void {
  let tokenAddress = event.address.toHexString();
  let value = event.params.value;

  // add value to to
  let toAddress = event.params.to.toHexString();

  // when burning a token the to Address is the 0 address in the event
  if (toAddress != AddressZero) {
    ensureAccountCreated(toAddress);

    let toBalance = getTokenBalance(tokenAddress, toAddress);

    toBalance.balance = toBalance.balance.plus(value);

    toBalance.save();
  }

  let fromAddress = event.params.from.toHexString();

  // when minting a token the from address is the 0 address in the event
  if (fromAddress != AddressZero) {
    ensureUserCreated(fromAddress);

    let fromBalance = getTokenBalance(tokenAddress, fromAddress);

    fromBalance.balance = fromBalance.balance.minus(value);

    fromBalance.save();
  }
}
