/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { IERC1820Implementer } from "../IERC1820Implementer";

export class IERC1820Implementer__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IERC1820Implementer {
    return new Contract(address, _abi, signerOrProvider) as IERC1820Implementer;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "interfaceHash",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "canImplementInterfaceForAddress",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
