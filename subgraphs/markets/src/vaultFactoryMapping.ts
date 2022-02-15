import { Address, dataSource } from "@graphprotocol/graph-ts";
import { Mint } from "../generated/ERC721VaultFactory/ERC721VaultFactory";
import { ERC721Token } from "../generated/schema";
import { ERC721TokenVault } from "../generated/templates";
import { ERC721MetaData } from "../generated/templates/ERC721MetaData/ERC721MetaData";
import { ERC721TokenVault as ERC721TokenVault_Contract } from "../generated/templates/ERC721TokenVault/ERC721TokenVault";
import {
  AuctionState,
  bigZero,
  whiteListedTokenVaults,
} from "./utils/constants";
import { getTokenVault } from "./utils/vault";

let AuctionStates: string[] = [
  AuctionState.inactive.toString(),
  AuctionState.live.toString(),
  AuctionState.ended.toString(),
  AuctionState.redeemed.toString(),
];

export function handleMint(event: Mint): void {
  let vaultAddress = event.params.vault;
  // Only create tokenVault entities that we will index moving forward if whitelisted
  if (
    dataSource.network() == "mainnet" &&
    !whiteListedTokenVaults.isSet(vaultAddress.toHexString().toLowerCase())
  )
    return;

  let tokenVault = getTokenVault(vaultAddress.toHexString());

  let nftAddress = event.params.token.toHexString();
  let nftId = event.params.id;
  let erc721Id = nftAddress + nftId.toString();

  tokenVault.erc721 = erc721Id;
  tokenVault.totalSupply = bigZero;

  // set initialized values
  let tokenVaultContract = ERC721TokenVault_Contract.bind(vaultAddress);
  tokenVault.curator = tokenVaultContract.curator().toHexString();
  tokenVault.fee = tokenVaultContract.fee();
  tokenVault.auctionState = AuctionStates[tokenVaultContract.auctionState()];

  tokenVault.save();

  // save NFT
  let nft = new ERC721Token(erc721Id);
  nft.address = nftAddress;
  nft.tokenId = nftId;

  let nftContract = ERC721MetaData.bind(Address.fromString(nftAddress));
  let uri = nftContract.try_tokenURI(nftId);

  if (!uri.reverted) nft.uri = uri.value;

  nft.save();

  ERC721TokenVault.create(vaultAddress);
}
