import * as dotenv from "dotenv";

import "@nomicfoundation/hardhat-toolbox";
import "hardhat-contract-sizer";
import "solidity-coverage";
import "@nomiclabs/hardhat-solhint";
import "hardhat-gas-reporter";
import '@nomicfoundation/hardhat-ethers'
import '@nomicfoundation/hardhat-ethers'
import '@nomicfoundation/hardhat-chai-matchers'
import "hardhat-contract-sizer";
import { HardhatUserConfig } from "hardhat/config";
import { STAGING_ACCOUNTS_PKEYS} from "./constants/test-accounts";
import {HardhatNetworkAccountUserConfig} from "hardhat/types/config";
import "hardhat-tracer";

dotenv.config();

const devAccounts: HardhatNetworkAccountUserConfig[] =  STAGING_ACCOUNTS_PKEYS.map(
  key=>  { return {privateKey: key, balance: "1000000000000000000000000"}}); 

const config: HardhatUserConfig = {
  gasReporter: {
    enabled: process.env.REPORT_GAS === "true",
    currency: 'USDC',
    gasPrice: 10
  },  
  mocha: {
    timeout: 100000000
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      accounts: devAccounts,
      mining: {
        auto: true,
        interval: 2000,
      },
      hardfork: 'london',
      gas: 'auto',
      initialBaseFeePerGas: 1000000000,
    },
    local: {
      chainId: 1337,
      hardfork: 'shanghai',
      url: "http://localhost:8545",
      accounts: STAGING_ACCOUNTS_PKEYS,      
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      gasPrice: 120 * 1000000000,
      chainId: 1,
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
      chainId: 42,
      gasPrice: 20000000000,
      gasMultiplier: 2,
    },
    matic: {
      url: "https://rpc-mainnet.maticvigil.com",
      chainId: 137,            
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com/",
      chainId: 80001,      
      gasMultiplier: 2,
      accounts: STAGING_ACCOUNTS_PKEYS
    },
    base_devnet: {
      url: `${process.env.TENDERLY_DEV_NET_RPC}`,
      chainId: 8453,
      gasMultiplier: 4,
      accounts: STAGING_ACCOUNTS_PKEYS
    },
    optimism_devnet: {
      url: `${process.env.TENDERLY_DEV_NET_RPC}`,
      chainId: 10,
      gasMultiplier: 4,
      accounts: STAGING_ACCOUNTS_PKEYS
    },
    ethereum_devnet: {
      url: `${process.env.TENDERLY_DEV_NET_RPC}`,
      chainId: 1,
      gasMultiplier: 4,
      accounts: STAGING_ACCOUNTS_PKEYS
    }
  },
  solidity: {
    compilers: [
      {
        version: '0.4.21',
        settings: {
          optimizer: {
            enabled: true,
            runs: 0,
          },
        },
      },
      {
        version: '0.4.24',
        settings: {
          optimizer: {
            enabled: true,
            runs: 0,
          },
        },
      },
      {
        version: '0.5.17',
        settings: {
          optimizer: {
            enabled: true,
            runs: 0,
          },
        },
      },
      {
        version: '0.8.18',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },

        },
      },
      {
        version: '0.8.15',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },

        },
      },
    ],
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: false,
    strict: true
  }
};

export default config;
