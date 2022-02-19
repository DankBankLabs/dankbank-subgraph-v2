import { BigInt, TypedMap } from "@graphprotocol/graph-ts";

export const bigZero = BigInt.fromI32(0);
export const bigOne = BigInt.fromI32(1);
export const weiPerEth = BigInt.fromI32(10).pow(18);

export const AddressZero = "0x0000000000000000000000000000000000000000";

export let whiteListedTokenVaults = new TypedMap<string, boolean>();

// 10Guy
whiteListedTokenVaults.set("0x9550a643148501eeb5c00e7e74739c2aae953373", true);

// HideYoKids
whiteListedTokenVaults.set("0x63a8041d6897e0f3dc10291c87a02728e14243ec", true);

// Panda
whiteListedTokenVaults.set("0x0c19a90a91d5f61289807248d0842c2b01da6061", true);

// HiOkay
whiteListedTokenVaults.set("0x9874d02d03aabb8992da6a4b34b576665fe30926", true);

// 2PBF
whiteListedTokenVaults.set("0x06e77ea85252f6fe07185dcdebbed8bcbaf69218", true);

// HoneyBadger
whiteListedTokenVaults.set("0xf9404561386e5f4c71ad88908c0c18ff81faf1c2", true);

// Ermagherd
whiteListedTokenVaults.set("0x94aebf59442ccca4c6f16913526e3488da9a2a9b", true);

// FeelsPepe
whiteListedTokenVaults.set("0x1994e631a6a718c1473d5dad575d9b0d940e2e8f", true);

// Croissant
whiteListedTokenVaults.set("0x1ab005215936347b30c9044f34dc883394f02bc4", true);

// Evolution of Dance
whiteListedTokenVaults.set("0x11c8083384d2daa5e1f41811c28635120643e0f3", true);

// Chickens
whiteListedTokenVaults.set("0xcf8a595681ce6f892365fbf52fa263bcb4353187", true);

// BadLuckBrian
whiteListedTokenVaults.set("0x9d73b95250124579ff1f14266354984d732f6d41", true);

// TipsFedora
whiteListedTokenVaults.set("0xe833d71911d3ebcd7d7a98e30d433e616aa4e7c7", true);

// SuccessKid
whiteListedTokenVaults.set("0xee2fc76642342d3d70401ecd03e8e0b2544bfe00", true);

// Feisty Doge
whiteListedTokenVaults.set("0xdfdb7f72c1f195c5951a234e8db9806eb0635346", true);

// The Doge
whiteListedTokenVaults.set("0xbaac2b4491727d78d2b78815144570b9f2fe8899", true);

/**
 * hack used to mimic the usage of enum without build error.
 * Replace with a more suitable alternative
 */
class NamedObject {
  private readonly name: string;
  protected constructor(name: string) {
    this.name = name;
  }

  toString(): string {
    return this.name;
  }
}

export class TransactionType extends NamedObject {
  static readonly BUY: TransactionType = new TransactionType("BUY");
  static readonly SELL: TransactionType = new TransactionType("SELL");
  static readonly ADD_LIQUIDITY: TransactionType = new TransactionType("ADD_LIQUIDITY");
  static readonly REMOVE_LIQUIDITY: TransactionType = new TransactionType("REMOVE_LIQUIDITY");
  static readonly COMMIT_TO_AUCTION: TransactionType = new TransactionType("COMMIT_TO_AUCTION");
}

export class AuctionState extends NamedObject {
  static inactive: AuctionState = new AuctionState("inactive");
  static live: AuctionState = new AuctionState("live");
  static ended: AuctionState = new AuctionState("ended");
  static redeemed: AuctionState = new AuctionState("redeemed");
}
