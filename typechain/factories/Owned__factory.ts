/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { Owned } from "../Owned";

export class Owned__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Owned> {
    return super.deploy(overrides || {}) as Promise<Owned>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Owned {
    return super.attach(address) as Owned;
  }
  connect(signer: Signer): Owned__factory {
    return super.connect(signer) as Owned__factory;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Owned {
    return new Contract(address, _abi, signerOrProvider) as Owned;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "isOwner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "newOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506101ec806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806379ba50971461005c5780638da5cb5b146100665780638f32d59b14610090578063d4ee1d90146100ae578063f2fde38b146100c1575b600080fd5b6100646100d4565b005b6000546001600160a01b03165b6040516001600160a01b0390911681526020015b60405180910390f35b6000546001600160a01b031633146040519015158152602001610087565b600154610073906001600160a01b031681565b6100646100cf366004610188565b61014f565b6001546001600160a01b031633146100eb57600080fd5b600154600080546040516001600160a01b0393841693909116917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a360018054600080546001600160a01b03199081166001600160a01b03841617909155169055565b6000546001600160a01b0316331461016657600080fd5b600180546001600160a01b0319166001600160a01b0392909216919091179055565b600060208284031215610199578081fd5b81356001600160a01b03811681146101af578182fd5b939250505056fea264697066735822122029ac4beef4a4ea289e57dc4f9bd8303372aeb9646d2b2ab49cc7758736df8a8b64736f6c63430008040033";
