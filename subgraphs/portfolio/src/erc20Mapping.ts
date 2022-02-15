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
