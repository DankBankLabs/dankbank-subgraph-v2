
import { Build } from "../generated/MerkleClaimERC20Factory/MerkleClaimERC20Factory";
import { MerkleClaimERC20 } from "../generated/templates";

export function handleBuild(event: Build): void {
  MerkleClaimERC20.create(event.params.merkleClaimERC20);
}
