/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { PointList } from "../PointList";

export class PointList__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<PointList> {
    return super.deploy(overrides || {}) as Promise<PointList>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): PointList {
    return super.attach(address) as PointList;
  }
  connect(signer: Signer): PointList__factory {
    return super.connect(signer) as PointList__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PointList {
    return new Contract(address, _abi, signerOrProvider) as PointList;
  }
}

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "AdminRoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "AdminRoleRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "MinterRoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "MinterRoleRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "OperatorRoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "OperatorRoleRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "oldPoints",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newPoints",
        type: "uint256",
      },
    ],
    name: "PointsUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "SmartContractRoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "SmartContractRoleRemoved",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
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
  {
    inputs: [],
    name: "MINTER_ROLE",
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
  {
    inputs: [],
    name: "OPERATOR_ROLE",
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
  {
    inputs: [],
    name: "SMART_CONTRACT_ROLE",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "addAdminRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "addMinterRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "addOperatorRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "addSmartContractRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
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
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getRoleMember",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleMemberCount",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "hasAdminRole",
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
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "hasMinterRole",
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
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "hasOperatorRole",
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
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "hasPoints",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
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
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "hasSmartContractRole",
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
    inputs: [
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
    ],
    name: "initAccessControls",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
    ],
    name: "initPointList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
    ],
    name: "isInList",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "points",
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
        name: "_address",
        type: "address",
      },
    ],
    name: "removeAdminRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "removeMinterRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "removeOperatorRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "removeSmartContractRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]",
      },
    ],
    name: "setPoints",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalPoints",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611373806100206000396000f3fe608060405234801561001057600080fd5b50600436106101da5760003560e01c806391d1485411610104578063ca15c873116100a2578063e6594abd11610071578063e6594abd14610431578063f5b541a614610444578063fa33bcf314610459578063fc4e3e0a1461048457600080fd5b8063ca15c873146103e3578063d5391393146103f6578063d547741f1461040b578063dccfe3101461041e57600080fd5b8063a217fddf116100de578063a217fddf146103a2578063adbf3776146103aa578063b7928b1d146103bd578063c395fcb3146103d057600080fd5b806391d14854146103695780639478941c1461037c5780639a80c4a11461038f57600080fd5b806336568abe1161017c5780636595171c1161014b5780636595171c14610303578063857d2608146103165780638a845fc01461032b5780639010d07c1461033e57600080fd5b806336568abe146102c15780633f16431a146102d457806354f1e126146102e7578063567142be146102fa57600080fd5b8063248a9ca3116101b8578063248a9ca314610248578063283ba19b146102795780632f2ff15d1461028e578063358b8166146102a157600080fd5b8063099db017146101df578063113b0ab2146102075780631cd53d551461021a575b600080fd5b6101f26101ed3660046110aa565b610497565b60405190151581526020015b60405180910390f35b6101f26102153660046110aa565b6104b7565b6101f26102283660046110c4565b6001600160a01b0391909116600090815260026020526040902054101590565b61026b6102563660046111ae565b60009081526020819052604090206002015490565b6040519081526020016101fe565b61028c6102873660046110aa565b6104d1565b005b61028c61029c3660046111c6565b6104dd565b61026b6102af3660046110aa565b60026020526000908152604090205481565b61028c6102cf3660046111c6565b610570565b61028c6102e23660046110aa565b6105ea565b61028c6102f53660046110aa565b61063b565b61026b60035481565b61028c6103113660046110aa565b61068c565b61026b6000805160206112de83398151915281565b61028c6103393660046110aa565b6106d0565b61035161034c3660046111f1565b610721565b6040516001600160a01b0390911681526020016101fe565b6101f26103773660046111c6565b610740565b61028c61038a3660046110aa565b610758565b61028c61039d3660046110ed565b6107a9565b61026b600081565b61028c6103b83660046110aa565b610a01565b61028c6103cb3660046110aa565b610a52565b6101f26103de3660046110aa565b610aa3565b61026b6103f13660046111ae565b610aaf565b61026b60008051602061131e83398151915281565b61028c6104193660046111c6565b610ac6565b61028c61042c3660046110aa565b610b47565b61028c61043f3660046110aa565b610b8b565b61026b6000805160206112fe83398151915281565b6101f26104673660046110aa565b6001600160a01b0316600090815260026020526040902054151590565b6101f26104923660046110aa565b610c36565b60006104b160008051602061131e83398151915283610740565b92915050565b60006104b16000805160206112de83398151915283610740565b6104da81610b8b565b50565b6000828152602081905260409020600201546104f99033610740565b6105625760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e60448201526e0818591b5a5b881d1bc819dc985b9d608a1b60648201526084015b60405180910390fd5b61056c8282610c50565b5050565b6001600160a01b03811633146105e05760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608401610559565b61056c8282610ca9565b6106026000805160206112de833981519152826104dd565b60405133906001600160a01b038316907f1d5f9ec24c6f91be922ea13ceaad919ad6554a41b5c26087f96289a9baf98ad290600090a350565b61065360008051602061131e83398151915282610ac6565b60405133906001600160a01b038316907f56692a161ffec953ddf9def93b958ea8d1ec95e21b80870c66be91a4374dc4e390600090a350565b6106976000826104dd565b60405133906001600160a01b038316907f2570ac42fd8b322dc453ada624dc2ed0e9bdd67f16f201a25bbd30468f2aa18790600090a350565b6106e86000805160206112de83398151915282610ac6565b60405133906001600160a01b038316907fe5f1aa9e528307345194b88b24a32401c13926e0823060f1049d9b26c0bb62b290600090a350565b60008281526020819052604081206107399083610d02565b9392505050565b60008281526020819052604081206107399083610d0e565b6107706000805160206112fe83398151915282610ac6565b60405133906001600160a01b038316907f70b25138b6fadeb9992d18b9653564271823e34b3e3257515d12a6d4b15fcddf90600090a350565b6107b233610aa3565b806107c157506107c133610c36565b6108225760405162461bcd60e51b815260206004820152602c60248201527f506f696e744c6973742e736574506f696e74733a2053656e646572206d75737460448201526b1031329037b832b930ba37b960a11b6064820152608401610559565b81516108705760405162461bcd60e51b815260206004820181905260248201527f506f696e744c6973742e736574506f696e74733a20656d7074792061727261796044820152606401610559565b80518251146108d55760405162461bcd60e51b815260206004820152602b60248201527f506f696e744c6973742e736574506f696e74733a20696e636f7272656374206160448201526a0e4e4c2f240d8cadccee8d60ab1b6064820152608401610559565b60005b82518110156109fc57600083828151811061090357634e487b7160e01b600052603260045260246000fd5b60200260200101519050600083838151811061092f57634e487b7160e01b600052603260045260246000fd5b60200260200101519050600060026000846001600160a01b03166001600160a01b031681526020019081526020016000205490508082146109e6576001600160a01b038316600090815260026020526040902082905560035461099e9083906109989084610d30565b90610d8c565b60035560408051828152602081018490526001600160a01b038516917feceb10b266995afd3009502df537b0421b7f635dd268f4b0a74b99a87be65213910160405180910390a25b50505080806109f490611296565b9150506108d8565b505050565b610a1960008051602061131e833981519152826104dd565b60405133906001600160a01b038316907f0be6ab9784c7401fafb73f7bc47bc67cc4ef8c47a60ad3cb66d1de0353a0784c90600090a350565b610a6a6000805160206112fe833981519152826104dd565b60405133906001600160a01b038316907f2d45ee102874989882745a26688d0b4fffee125a18df26536b12582c7fde4e1790600090a350565b60006104b18183610740565b60008181526020819052604081206104b190610deb565b600082815260208190526040902060020154610ae29033610740565b6105e05760405162461bcd60e51b815260206004820152603060248201527f416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e60448201526f2061646d696e20746f207265766f6b6560801b6064820152608401610559565b610b52600082610ac6565b60405133906001600160a01b038316907f21ba1239795d4e22874e3dc55f0a9d7b65bfb23069d32965d7c23be9524ccf9590600090a350565b60015460ff1615610bd45760405162461bcd60e51b8152602060048201526013602482015272105b1c9958591e481a5b9a5d1a585b1a5cd959606a1b6044820152606401610559565b6001600160a01b038116610c1c5760405162461bcd60e51b815260206004820152600f60248201526e125b98dbdc9c9958dd081a5b9c1d5d608a1b6044820152606401610559565b610c27600082610562565b506001805460ff191681179055565b60006104b16000805160206112fe83398151915283610740565b6000828152602081905260409020610c689082610df5565b1561056c5760405133906001600160a01b0383169084907f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d90600090a45050565b6000828152602081905260409020610cc19082610e0a565b1561056c5760405133906001600160a01b0383169084907ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b90600090a45050565b60006107398383610e1f565b6001600160a01b03811660009081526001830160205260408120541515610739565b600082821115610d825760405162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f7700006044820152606401610559565b610739828461127f565b600080610d998385611267565b9050838110156107395760405162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f7700000000006044820152606401610559565b60006104b1825490565b6000610739836001600160a01b038416610eb3565b6000610739836001600160a01b038416610f02565b81546000908210610e7d5760405162461bcd60e51b815260206004820152602260248201527f456e756d657261626c655365743a20696e646578206f7574206f6620626f756e604482015261647360f01b6064820152608401610559565b826000018281548110610ea057634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905092915050565b6000818152600183016020526040812054610efa575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556104b1565b5060006104b1565b60008181526001830160205260408120548015611015576000610f2660018361127f565b8554909150600090610f3a9060019061127f565b90506000866000018281548110610f6157634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080876000018481548110610f9257634e487b7160e01b600052603260045260246000fd5b600091825260209091200155610fa9836001611267565b60008281526001890160205260409020558654879080610fd957634e487b7160e01b600052603160045260246000fd5b600190038181906000526020600020016000905590558660010160008781526020019081526020016000206000905560019450505050506104b1565b60009150506104b1565b80356001600160a01b038116811461103657600080fd5b919050565b600082601f83011261104b578081fd5b8135602061106061105b83611243565b611212565b80838252828201915082860187848660051b890101111561107f578586fd5b855b8581101561109d57813584529284019290840190600101611081565b5090979650505050505050565b6000602082840312156110bb578081fd5b6107398261101f565b600080604083850312156110d6578081fd5b6110df8361101f565b946020939093013593505050565b600080604083850312156110ff578182fd5b823567ffffffffffffffff80821115611116578384fd5b818501915085601f830112611129578384fd5b8135602061113961105b83611243565b8083825282820191508286018a848660051b8901011115611158578889fd5b8896505b848710156111815761116d8161101f565b83526001969096019591830191830161115c565b5096505086013592505080821115611197578283fd5b506111a48582860161103b565b9150509250929050565b6000602082840312156111bf578081fd5b5035919050565b600080604083850312156111d8578182fd5b823591506111e86020840161101f565b90509250929050565b60008060408385031215611203578182fd5b50508035926020909101359150565b604051601f8201601f1916810167ffffffffffffffff8111828210171561123b5761123b6112c7565b604052919050565b600067ffffffffffffffff82111561125d5761125d6112c7565b5060051b60200190565b6000821982111561127a5761127a6112b1565b500190565b600082821015611291576112916112b1565b500390565b60006000198214156112aa576112aa6112b1565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfe9d49f397ae9ef1a834b569acb967799a367061e305932181a44f5773da873bfd97667070c54ef182b0f5858b034beac1b6f3089aa2d3188bb1e8929f4fa9b9299f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a2646970667358221220443611d7c01f6358a09eec8812bfa8085fe8350126dca2e2a10cc4f65d5fb27e64736f6c63430008040033";
