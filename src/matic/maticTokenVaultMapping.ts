import {
  InitializeCall,
  KickCuratorCall,
  Transfer,
  UpdateCuratorCall,
  UpdateFeeCall,
} from "../generated/templates/ERC721TokenVault/ERC721TokenVault";
import { TokenBalance } from "../generated/schema";
import { bigZero, AddressZero } from "./utils/constants";
import { getTokenVault } from "./utils/vault";
import { ensureUserCreated } from "./utils/user";

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

    tokenVault.save();
}

export function handleInitialize(call: InitializeCall): void {
  let tokenVault = getTokenVault(call.from.toHexString());

  // set curator
  const curatorAddress = call.inputs._curator.toHexString();
  ensureUserCreated(curatorAddress);
  tokenVault.curator = curatorAddress;
  // set fee
  tokenVault.fee = call.inputs._fee

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
