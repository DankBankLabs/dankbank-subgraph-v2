/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { ERC721 } from "../ERC721";

export class ERC721__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    name_: string,
    symbol_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC721> {
    return super.deploy(name_, symbol_, overrides || {}) as Promise<ERC721>;
  }
  getDeployTransaction(
    name_: string,
    symbol_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  attach(address: string): ERC721 {
    return super.attach(address) as ERC721;
  }
  connect(signer: Signer): ERC721__factory {
    return super.connect(signer) as ERC721__factory;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ERC721 {
    return new Contract(address, _abi, signerOrProvider) as ERC721;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
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
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
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
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001acb38038062001acb83398101604081905262000034916200028d565b620000466301ffc9a760e01b620000b0565b81516200005b90600690602085019062000134565b5080516200007190600790602084019062000134565b50620000846380ac58cd60e01b620000b0565b62000096635b5e139f60e01b620000b0565b620000a863780e9d6360e01b620000b0565b505062000347565b6001600160e01b031980821614156200010f5760405162461bcd60e51b815260206004820152601c60248201527f4552433136353a20696e76616c696420696e7465726661636520696400000000604482015260640160405180910390fd5b6001600160e01b0319166000908152602081905260409020805460ff19166001179055565b8280546200014290620002f4565b90600052602060002090601f016020900481019282620001665760008555620001b1565b82601f106200018157805160ff1916838001178555620001b1565b82800160010185558215620001b1579182015b82811115620001b157825182559160200191906001019062000194565b50620001bf929150620001c3565b5090565b5b80821115620001bf5760008155600101620001c4565b600082601f830112620001eb578081fd5b81516001600160401b038082111562000208576200020862000331565b604051601f8301601f19908116603f0116810190828211818310171562000233576200023362000331565b816040528381526020925086838588010111156200024f578485fd5b8491505b8382101562000272578582018301518183018401529082019062000253565b838211156200028357848385830101525b9695505050505050565b60008060408385031215620002a0578182fd5b82516001600160401b0380821115620002b7578384fd5b620002c586838701620001da565b93506020850151915080821115620002db578283fd5b50620002ea85828601620001da565b9150509250929050565b600181811c908216806200030957607f821691505b602082108114156200032b57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b61177480620003576000396000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c80634f6ccce7116100a257806395d89b411161007157806395d89b4114610237578063a22cb4651461023f578063b88d4fde14610252578063c87b56dd14610265578063e985e9c51461027857600080fd5b80634f6ccce7146101f65780636352211e146102095780636c0360eb1461021c57806370a082311461022457600080fd5b806318160ddd116100de57806318160ddd146101a757806323b872dd146101bd5780632f745c59146101d057806342842e0e146101e357600080fd5b806301ffc9a71461011057806306fdde0314610152578063081812fc14610167578063095ea7b314610192575b600080fd5b61013d61011e366004611443565b6001600160e01b03191660009081526020819052604090205460ff1690565b60405190151581526020015b60405180910390f35b61015a6102b4565b604051610149919061152b565b61017a61017536600461147b565b610346565b6040516001600160a01b039091168152602001610149565b6101a56101a036600461141a565b6103d3565b005b6101af6104e9565b604051908152602001610149565b6101a56101cb3660046112d0565b6104fa565b6101af6101de36600461141a565b61052b565b6101a56101f13660046112d0565b610556565b6101af61020436600461147b565b610571565b61017a61021736600461147b565b610587565b61015a6105af565b6101af610232366004611284565b6105be565b61015a61064a565b6101a561024d3660046113e0565b610659565b6101a561026036600461130b565b61071e565b61015a61027336600461147b565b610756565b61013d61028636600461129e565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b6060600680546102c390611650565b80601f01602080910402602001604051908101604052809291908181526020018280546102ef90611650565b801561033c5780601f106103115761010080835404028352916020019161033c565b820191906000526020600020905b81548152906001019060200180831161031f57829003601f168201915b5050505050905090565b6000610351826108c8565b6103b75760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b60006103de82610587565b9050806001600160a01b0316836001600160a01b0316141561044c5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084016103ae565b336001600160a01b038216148061046857506104688133610286565b6104da5760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c000000000000000060648201526084016103ae565b6104e483836108d5565b505050565b60006104f56002610943565b905090565b610504338261094d565b6105205760405162461bcd60e51b81526004016103ae90611590565b6104e4838383610a37565b6001600160a01b038216600090815260016020526040812061054d9083610bb8565b90505b92915050565b6104e48383836040518060200160405280600081525061071e565b60008061057f600284610bc4565b509392505050565b6000610550826040518060600160405280602981526020016117166029913960029190610be0565b6060600980546102c390611650565b60006001600160a01b0382166106295760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b60648201526084016103ae565b6001600160a01b038216600090815260016020526040902061055090610943565b6060600780546102c390611650565b6001600160a01b0382163314156106b25760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016103ae565b3360008181526005602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b610728338361094d565b6107445760405162461bcd60e51b81526004016103ae90611590565b61075084848484610bf7565b50505050565b6060610761826108c8565b6107c55760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b60648201526084016103ae565b600082815260086020526040812080546107de90611650565b80601f016020809104026020016040519081016040528092919081815260200182805461080a90611650565b80156108575780601f1061082c57610100808354040283529160200191610857565b820191906000526020600020905b81548152906001019060200180831161083a57829003601f168201915b5050505050905060006108686105af565b905080516000141561087b575092915050565b8151156108ad5780826040516020016108959291906114bf565b60405160208183030381529060405292505050919050565b806108b785610c2a565b6040516020016108959291906114bf565b6000610550600283610d44565b600081815260046020526040902080546001600160a01b0319166001600160a01b038416908117909155819061090a82610587565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000610550825490565b6000610958826108c8565b6109b95760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084016103ae565b60006109c483610587565b9050806001600160a01b0316846001600160a01b031614806109ff5750836001600160a01b03166109f484610346565b6001600160a01b0316145b80610a2f57506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b0316610a4a82610587565b6001600160a01b031614610ab25760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201526839903737ba1037bbb760b91b60648201526084016103ae565b6001600160a01b038216610b145760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016103ae565b610b1f6000826108d5565b6001600160a01b0383166000908152600160205260409020610b419082610d5c565b506001600160a01b0382166000908152600160205260409020610b649082610d68565b50610b7160028284610d74565b5080826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050565b600061054d8383610d8a565b6000808080610bd38686610e1e565b9097909650945050505050565b6000610bed848484610ec9565b90505b9392505050565b610c02848484610a37565b610c0e84848484610f40565b6107505760405162461bcd60e51b81526004016103ae9061153e565b606081610c4e5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610c785780610c628161168b565b9150610c719050600a836115f9565b9150610c52565b60008167ffffffffffffffff811115610ca157634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015610ccb576020820181803683370190505b5090505b8415610a2f57610ce060018361160d565b9150610ced600a866116a6565b610cf89060306115e1565b60f81b818381518110610d1b57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350610d3d600a866115f9565b9450610ccf565b6000818152600183016020526040812054151561054d565b600061054d838361104d565b600061054d838361116a565b6000610bed84846001600160a01b0385166111b9565b81546000908210610de85760405162461bcd60e51b815260206004820152602260248201527f456e756d657261626c655365743a20696e646578206f7574206f6620626f756e604482015261647360f01b60648201526084016103ae565b826000018281548110610e0b57634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905092915050565b815460009081908310610e7e5760405162461bcd60e51b815260206004820152602260248201527f456e756d657261626c654d61703a20696e646578206f7574206f6620626f756e604482015261647360f01b60648201526084016103ae565b6000846000018481548110610ea357634e487b7160e01b600052603260045260246000fd5b906000526020600020906002020190508060000154816001015492509250509250929050565b60008281526001840160205260408120548281610ef95760405162461bcd60e51b81526004016103ae919061152b565b5084610f0660018361160d565b81548110610f2457634e487b7160e01b600052603260045260246000fd5b9060005260206000209060020201600101549150509392505050565b60006001600160a01b0384163b1561104257604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610f849033908990889088906004016114ee565b602060405180830381600087803b158015610f9e57600080fd5b505af1925050508015610fce575060408051601f3d908101601f19168201909252610fcb9181019061145f565b60015b611028573d808015610ffc576040519150601f19603f3d011682016040523d82523d6000602084013e611001565b606091505b5080516110205760405162461bcd60e51b81526004016103ae9061153e565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610a2f565b506001949350505050565b6000818152600183016020526040812054801561116057600061107160018361160d565b85549091506000906110859060019061160d565b905060008660000182815481106110ac57634e487b7160e01b600052603260045260246000fd5b90600052602060002001549050808760000184815481106110dd57634e487b7160e01b600052603260045260246000fd5b6000918252602090912001556110f48360016115e1565b6000828152600189016020526040902055865487908061112457634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055866001016000878152602001908152602001600020600090556001945050505050610550565b6000915050610550565b60008181526001830160205260408120546111b157508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610550565b506000610550565b60008281526001840160205260408120548061121e575050604080518082018252838152602080820184815286546001818101895560008981528481209551600290930290950191825591519082015586548684528188019092529290912055610bf0565b828561122b60018461160d565b8154811061124957634e487b7160e01b600052603260045260246000fd5b9060005260206000209060020201600101819055506000915050610bf0565b80356001600160a01b038116811461127f57600080fd5b919050565b600060208284031215611295578081fd5b61054d82611268565b600080604083850312156112b0578081fd5b6112b983611268565b91506112c760208401611268565b90509250929050565b6000806000606084860312156112e4578081fd5b6112ed84611268565b92506112fb60208501611268565b9150604084013590509250925092565b60008060008060808587031215611320578081fd5b61132985611268565b935061133760208601611268565b925060408501359150606085013567ffffffffffffffff8082111561135a578283fd5b818701915087601f83011261136d578283fd5b81358181111561137f5761137f6116e6565b604051601f8201601f19908116603f011681019083821181831017156113a7576113a76116e6565b816040528281528a60208487010111156113bf578586fd5b82602086016020830137918201602001949094529598949750929550505050565b600080604083850312156113f2578182fd5b6113fb83611268565b91506020830135801515811461140f578182fd5b809150509250929050565b6000806040838503121561142c578182fd5b61143583611268565b946020939093013593505050565b600060208284031215611454578081fd5b8135610bf0816116fc565b600060208284031215611470578081fd5b8151610bf0816116fc565b60006020828403121561148c578081fd5b5035919050565b600081518084526114ab816020860160208601611624565b601f01601f19169290920160200192915050565b600083516114d1818460208801611624565b8351908301906114e5818360208801611624565b01949350505050565b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061152190830184611493565b9695505050505050565b60208152600061054d6020830184611493565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b600082198211156115f4576115f46116ba565b500190565b600082611608576116086116d0565b500490565b60008282101561161f5761161f6116ba565b500390565b60005b8381101561163f578181015183820152602001611627565b838111156107505750506000910152565b600181811c9082168061166457607f821691505b6020821081141561168557634e487b7160e01b600052602260045260246000fd5b50919050565b600060001982141561169f5761169f6116ba565b5060010190565b6000826116b5576116b56116d0565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160e01b03198116811461171257600080fd5b5056fe4552433732313a206f776e657220717565727920666f72206e6f6e6578697374656e7420746f6b656ea2646970667358221220184c41606f5b1c134bdae712c61ebc6e511079f3a23b6cebdca6ef2f416e760364736f6c63430008040033";
