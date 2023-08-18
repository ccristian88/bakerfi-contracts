/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  LaundromatVault,
  LaundromatVaultInterface,
} from "../../../contracts/core/LaundromatVault";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "contract ServiceRegistry",
        name: "registry",
        type: "address",
      },
      {
        internalType: "contract IStrategy",
        name: "strategy",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "InvalidShortString",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "str",
        type: "string",
      },
    ],
    name: "StringTooLong",
    type: "error",
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
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
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
        indexed: false,
        internalType: "address",
        name: "depositor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "EIP712DomainChanged",
    type: "event",
  },
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
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
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
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
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
    name: "_registry",
    outputs: [
      {
        internalType: "contract ServiceRegistry",
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
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
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
    inputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    name: "convertToAssets",
    outputs: [
      {
        internalType: "uint256",
        name: "assets",
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
        name: "assets",
        type: "uint256",
      },
    ],
    name: "convertToShares",
    outputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "deposit",
    outputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      {
        internalType: "bytes1",
        name: "fields",
        type: "bytes1",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "version",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "verifyingContract",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        internalType: "uint256[]",
        name: "extensions",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "harvest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "loanToValue",
    outputs: [
      {
        internalType: "uint256",
        name: "ltv",
        type: "uint256",
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
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "nonces",
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
    inputs: [],
    name: "paused",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [],
    name: "tokenPerETh",
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
    name: "totalCollateral",
    outputs: [
      {
        internalType: "uint256",
        name: "totalCollateralInEth",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalDebt",
    outputs: [
      {
        internalType: "uint256",
        name: "totalDebtInEth",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalPosition",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "receiver",
        type: "address",
      },
    ],
    name: "withdraw",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x6101a06040523480156200001257600080fd5b50604051620026d5380380620026d5833981016040819052620000359162000359565b6040518060400160405280600e81526020016d0d8c2eadcc8e4dedac2e8408aa8960931b81525080604051806040016040528060018152602001603160f81b8152506040518060400160405280600e81526020016d0d8c2eadcc8e4dedac2e8408aa8960931b815250604051806040016040528060068152602001650dac2e88aa8960d31b815250620000d7620000d16200025660201b60201c565b6200025a565b6000805460ff60a01b191690556004620000f2838262000452565b50600562000101828262000452565b5050506200011f600683620002aa60201b62000fb71790919060201c565b610120526200013c816007620002aa602090811b62000fb717901c565b61014052815160208084019190912060e052815190820120610100524660a052620001ca60e05161010051604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201529081019290925260608201524660808201523060a082015260009060c00160405160208183030381529060405280519060200120905090565b60805250503060c052506001600160a01b038316620002305760405162461bcd60e51b815260206004820152601560248201527f496e76616c6964204f776e65722041646472657373000000000000000000000060448201526064015b60405180910390fd5b6200023b836200025a565b6001600160a01b039182166101605216610180525062000593565b3390565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602083511015620002ca57620002c283620002fa565b9050620002f4565b82620002e1836200033d60201b62000fe81760201c565b90620002ee908262000452565b5060ff90505b92915050565b600080829050601f8151111562000328578260405163305a27a960e01b81526004016200022791906200051e565b805162000335826200056e565b179392505050565b90565b6001600160a01b03811681146200035657600080fd5b50565b6000806000606084860312156200036f57600080fd5b83516200037c8162000340565b60208501519093506200038f8162000340565b6040850151909250620003a28162000340565b809150509250925092565b634e487b7160e01b600052604160045260246000fd5b600181811c90821680620003d857607f821691505b602082108103620003f957634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200044d57600081815260208120601f850160051c81016020861015620004285750805b601f850160051c820191505b81811015620004495782815560010162000434565b5050505b505050565b81516001600160401b038111156200046e576200046e620003ad565b62000486816200047f8454620003c3565b84620003ff565b602080601f831160018114620004be5760008415620004a55750858301515b600019600386901b1c1916600185901b17855562000449565b600085815260208120601f198616915b82811015620004ef57888601518255948401946001909101908401620004ce565b50858210156200050e5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b600060208083528351808285015260005b818110156200054d578581018301518582016040015282016200052f565b506000604082860101526040601f19601f8301168501019250505092915050565b80516020808301519190811015620003f95760001960209190910360031b1b16919050565b60805160a05160c05160e05161010051610120516101405161016051610180516120ae620006276000396000818161065101528181610803015281816108f301528181610af201528181610e420152610f38015260006103bd015260006109e1015260006109b6015260006115c60152600061159e015260006114f9015260006115230152600061154d01526120ae6000f3fe6080604052600436106101d05760003560e01c806379cbc5fa116100f7578063a9059cbb11610095578063dd62ed3e11610064578063dd62ed3e1461051c578063f2fde38b1461053c578063f340fa011461055c578063fc7b9c181461056f57600080fd5b8063a9059cbb146104a7578063b4979041146104c7578063c6e6f592146104dc578063d505accf146104fc57600080fd5b806386d163df116100d157806386d163df1461043f5780638da5cb5b1461045457806395d89b4114610472578063a457c2d71461048757600080fd5b806379cbc5fa146103ab5780637ecebe00146103f757806384b0196e1461041757600080fd5b8063313ce5671161016f5780634ac8eb5f1161013e5780634ac8eb5f1461032c5780635c975abb1461034157806370a0823114610360578063715018a61461039657600080fd5b8063313ce567146102cb5780633644e515146102e757806339509351146102fc5780634641257d1461031c57600080fd5b8063095ea7b3116101ab578063095ea7b31461025157806317fbe3541461028157806318160ddd1461029657806323b872dd146102ab57600080fd5b8062f714ce146101dc57806306fdde031461020f57806307a2d13a1461023157600080fd5b366101d757005b600080fd5b3480156101e857600080fd5b506101fc6101f7366004611bb4565b610584565b6040519081526020015b60405180910390f35b34801561021b57600080fd5b50610224610715565b6040516102069190611c2a565b34801561023d57600080fd5b506101fc61024c366004611c3d565b6107a7565b34801561025d57600080fd5b5061027161026c366004611c56565b6107e2565b6040519015158152602001610206565b34801561028d57600080fd5b506101fc6107fc565b3480156102a257600080fd5b506003546101fc565b3480156102b757600080fd5b506102716102c6366004611c82565b610898565b3480156102d757600080fd5b5060405160128152602001610206565b3480156102f357600080fd5b506101fc6108bc565b34801561030857600080fd5b50610271610317366004611c56565b6108cb565b34801561032857600080fd5b505b005b34801561033857600080fd5b506101fc6108ef565b34801561034d57600080fd5b50600054600160a01b900460ff16610271565b34801561036c57600080fd5b506101fc61037b366004611cc3565b6001600160a01b031660009081526001602052604090205490565b3480156103a257600080fd5b5061032a610978565b3480156103b757600080fd5b506103df7f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b039091168152602001610206565b34801561040357600080fd5b506101fc610412366004611cc3565b61098a565b34801561042357600080fd5b5061042c6109a8565b6040516102069796959493929190611ce0565b34801561044b57600080fd5b506101fc610a31565b34801561046057600080fd5b506000546001600160a01b03166103df565b34801561047e57600080fd5b50610224610a53565b34801561049357600080fd5b506102716104a2366004611c56565b610a62565b3480156104b357600080fd5b506102716104c2366004611c56565b610add565b3480156104d357600080fd5b506101fc610aeb565b3480156104e857600080fd5b506101fc6104f7366004611c3d565b610b88565b34801561050857600080fd5b5061032a610517366004611d76565b610bbc565b34801561052857600080fd5b506101fc610537366004611ded565b610d20565b34801561054857600080fd5b5061032a610557366004611cc3565b610d4b565b6101fc61056a366004611cc3565b610dc4565b34801561057b57600080fd5b506101fc610f34565b336000908152600160205260408120548311156105e85760405162461bcd60e51b815260206004820152601d60248201527f4e6f20456e6f7567682062616c616e636520746f20776974686472617700000060448201526064015b60405180910390fd5b600061060a6105f660035490565b61060486633b9aca00610feb565b90610ff7565b90506000610628633b9aca00610604846106226107fc565b90610feb565b604051634fc8c77160e01b8152600481018290526001600160a01b0386811660248301529192507f000000000000000000000000000000000000000000000000000000000000000090911690634fc8c771906044016020604051808303816000875af115801561069c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106c09190611e1b565b92506106cc3386611003565b60408051338152602081018590529081018690527ff279e6a1f5e320cca91135676d9cb6e44ca8a08c0b88342bcdb1144f6511b5689060600160405180910390a1505092915050565b60606004805461072490611e34565b80601f016020809104026020016040519081016040528092919081815260200182805461075090611e34565b801561079d5780601f106107725761010080835404028352916020019161079d565b820191906000526020600020905b81548152906001019060200180831161078057829003601f168201915b5050505050905090565b60008060405180604001604052806107bd6107fc565b81526020016107cb60035490565b905290506107db81846000611139565b9392505050565b6000336107f08185856111ab565b60019150505b92915050565b60008060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316637398ab186040518163ffffffff1660e01b81526004016040805180830381865afa15801561085e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108829190611e68565b90925090506108918183611ea2565b9250505090565b6000336108a68582856112c7565b6108b1858585611341565b506001949350505050565b60006108c66114ec565b905090565b6000336107f08185856108de8383610d20565b6108e89190611eb5565b6111ab565b565b60007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316637398ab186040518163ffffffff1660e01b81526004016040805180830381865afa15801561094e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109729190611e68565b50919050565b610980611617565b6108ed6000611671565b6001600160a01b0381166000908152600860205260408120546107f6565b6000606080828080836109dc7f000000000000000000000000000000000000000000000000000000000000000060066116c1565b610a077f000000000000000000000000000000000000000000000000000000000000000060076116c1565b60408051600080825260208201909252600f60f81b9b939a50919850469750309650945092509050565b60006108c6610a3e6107fc565b610604670de0b6b3a764000061062260035490565b60606005805461072490611e34565b60003381610a708286610d20565b905083811015610ad05760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016105df565b6108b182868684036111ab565b6000336107f0818585611341565b60008060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316637398ab186040518163ffffffff1660e01b81526004016040805180830381865afa158015610b4d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b719190611e68565b90925090506108918261060483633b9aca00610feb565b6000806040518060400160405280610b9e6107fc565b8152602001610bac60035490565b905290506107db81846000611765565b83421115610c0c5760405162461bcd60e51b815260206004820152601d60248201527f45524332305065726d69743a206578706972656420646561646c696e6500000060448201526064016105df565b60007f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9888888610c3b8c6117b0565b6040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810186905260e0016040516020818303038152906040528051906020012090506000610c96826117d6565b90506000610ca682878787611803565b9050896001600160a01b0316816001600160a01b031614610d095760405162461bcd60e51b815260206004820152601e60248201527f45524332305065726d69743a20696e76616c6964207369676e6174757265000060448201526064016105df565b610d148a8a8a6111ab565b50505050505050505050565b6001600160a01b03918216600090815260026020908152604080832093909416825291909152205490565b610d53611617565b6001600160a01b038116610db85760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016105df565b610dc181611671565b50565b600034600003610e165760405162461bcd60e51b815260206004820152601760248201527f4e6f205a65726f206465706f73697420416c6c6f77657200000000000000000060448201526064016105df565b60006040518060400160405280610e2b6107fc565b8152602001610e3960035490565b815250905060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663775c300c346040518263ffffffff1660e01b815260040160206040518083038185885af1158015610ea0573d6000803e3d6000fd5b50505050506040513d601f19601f82011682018060405250810190610ec59190611e1b565b9050610ed382826000611765565b9250610edf848461182b565b604080513381526001600160a01b038616602082015234818301526060810185905290517fdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d79181900360800190a15050919050565b60007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316637398ab186040518163ffffffff1660e01b81526004016040805180830381865afa158015610f93573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107f69190611e68565b6000602083511015610fd357610fcc836118ec565b90506107f6565b81610fde8482611f2c565b5060ff90506107f6565b90565b60006107db8284611fec565b60006107db8284612003565b6001600160a01b0382166110635760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016105df565b6001600160a01b038216600090815260016020526040902054818110156110d75760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016105df565b6001600160a01b03831660008181526001602090815260408083208686039055600380548790039055518581529192917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91015b60405180910390a35b505050565b6000836020015160000361114e5750816107db565b6020840151845161115f9085611fec565b6111699190612003565b90508180156111935750835160208501518491906111879084611fec565b6111919190612003565b105b156107db57806111a281612025565b95945050505050565b6001600160a01b03831661120d5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016105df565b6001600160a01b03821661126e5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016105df565b6001600160a01b0383811660008181526002602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910161112b565b60006112d38484610d20565b9050600019811461133b578181101561132e5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016105df565b61133b84848484036111ab565b50505050565b6001600160a01b0383166113a55760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016105df565b6001600160a01b0382166114075760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016105df565b6001600160a01b0383166000908152600160205260409020548181101561147f5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016105df565b6001600160a01b0380851660008181526001602052604080822086860390559286168082529083902080548601905591517fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906114df9086815260200190565b60405180910390a361133b565b6000306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614801561154557507f000000000000000000000000000000000000000000000000000000000000000046145b1561156f57507f000000000000000000000000000000000000000000000000000000000000000090565b6108c6604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201527f0000000000000000000000000000000000000000000000000000000000000000918101919091527f000000000000000000000000000000000000000000000000000000000000000060608201524660808201523060a082015260009060c00160405160208183030381529060405280519060200120905090565b6000546001600160a01b031633146108ed5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016105df565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b606060ff83146116d457610fcc8361192a565b8180546116e090611e34565b80601f016020809104026020016040519081016040528092919081815260200182805461170c90611e34565b80156117595780601f1061172e57610100808354040283529160200191611759565b820191906000526020600020905b81548152906001019060200180831161173c57829003601f168201915b505050505090506107f6565b825160009081036117775750816107db565b835160208501516117889085611fec565b6117929190612003565b90508180156111935750602084015184518491906111879084611fec565b6001600160a01b0381166000908152600860205260409020805460018101825590610972565b60006107f66117e36114ec565b8360405161190160f01b8152600281019290925260228201526042902090565b600080600061181487878787611969565b9150915061182181611a2d565b5095945050505050565b6001600160a01b0382166118815760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016105df565b80600360008282546118939190611eb5565b90915550506001600160a01b0382166000818152600160209081526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b600080829050601f81511115611917578260405163305a27a960e01b81526004016105df9190611c2a565b80516119228261203e565b179392505050565b6060600061193783611b77565b604080516020808252818301909252919250600091906020820181803683375050509182525060208101929092525090565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08311156119a05750600090506003611a24565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa1580156119f4573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116611a1d57600060019250925050611a24565b9150600090505b94509492505050565b6000816004811115611a4157611a41612062565b03611a495750565b6001816004811115611a5d57611a5d612062565b03611aaa5760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e6174757265000000000000000060448201526064016105df565b6002816004811115611abe57611abe612062565b03611b0b5760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e6774680060448201526064016105df565b6003816004811115611b1f57611b1f612062565b03610dc15760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b60648201526084016105df565b600060ff8216601f8111156107f657604051632cd44ac360e21b815260040160405180910390fd5b6001600160a01b0381168114610dc157600080fd5b60008060408385031215611bc757600080fd5b823591506020830135611bd981611b9f565b809150509250929050565b6000815180845260005b81811015611c0a57602081850181015186830182015201611bee565b506000602082860101526020601f19601f83011685010191505092915050565b6020815260006107db6020830184611be4565b600060208284031215611c4f57600080fd5b5035919050565b60008060408385031215611c6957600080fd5b8235611c7481611b9f565b946020939093013593505050565b600080600060608486031215611c9757600080fd5b8335611ca281611b9f565b92506020840135611cb281611b9f565b929592945050506040919091013590565b600060208284031215611cd557600080fd5b81356107db81611b9f565b60ff60f81b881681526000602060e081840152611d0060e084018a611be4565b8381036040850152611d12818a611be4565b606085018990526001600160a01b038816608086015260a0850187905284810360c0860152855180825283870192509083019060005b81811015611d6457835183529284019291840191600101611d48565b50909c9b505050505050505050505050565b600080600080600080600060e0888a031215611d9157600080fd5b8735611d9c81611b9f565b96506020880135611dac81611b9f565b95506040880135945060608801359350608088013560ff81168114611dd057600080fd5b9699959850939692959460a0840135945060c09093013592915050565b60008060408385031215611e0057600080fd5b8235611e0b81611b9f565b91506020830135611bd981611b9f565b600060208284031215611e2d57600080fd5b5051919050565b600181811c90821680611e4857607f821691505b60208210810361097257634e487b7160e01b600052602260045260246000fd5b60008060408385031215611e7b57600080fd5b505080516020909101519092909150565b634e487b7160e01b600052601160045260246000fd5b818103818111156107f6576107f6611e8c565b808201808211156107f6576107f6611e8c565b634e487b7160e01b600052604160045260246000fd5b601f82111561113457600081815260208120601f850160051c81016020861015611f055750805b601f850160051c820191505b81811015611f2457828155600101611f11565b505050505050565b815167ffffffffffffffff811115611f4657611f46611ec8565b611f5a81611f548454611e34565b84611ede565b602080601f831160018114611f8f5760008415611f775750858301515b600019600386901b1c1916600185901b178555611f24565b600085815260208120601f198616915b82811015611fbe57888601518255948401946001909101908401611f9f565b5085821015611fdc5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b80820281158282048414176107f6576107f6611e8c565b60008261202057634e487b7160e01b600052601260045260246000fd5b500490565b60006001820161203757612037611e8c565b5060010190565b805160208083015191908110156109725760001960209190910360031b1b16919050565b634e487b7160e01b600052602160045260246000fdfea2646970667358221220d22edacea83923f16d3d70810ac52bd56396bf2467f173caef2a7c5f4897cac564736f6c63430008120033";

type LaundromatVaultConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LaundromatVaultConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LaundromatVault__factory extends ContractFactory {
  constructor(...args: LaundromatVaultConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    owner: AddressLike,
    registry: AddressLike,
    strategy: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      owner,
      registry,
      strategy,
      overrides || {}
    );
  }
  override deploy(
    owner: AddressLike,
    registry: AddressLike,
    strategy: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(owner, registry, strategy, overrides || {}) as Promise<
      LaundromatVault & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): LaundromatVault__factory {
    return super.connect(runner) as LaundromatVault__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LaundromatVaultInterface {
    return new Interface(_abi) as LaundromatVaultInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): LaundromatVault {
    return new Contract(address, _abi, runner) as unknown as LaundromatVault;
  }
}
