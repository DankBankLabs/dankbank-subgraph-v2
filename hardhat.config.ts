import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";
dotenvConfig({ path: resolve(__dirname, "./.env") });

import { HardhatUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-deploy";
import "hardhat-typechain";
import "@nomiclabs/hardhat-ganache";
import "solidity-coverage";
import '@openzeppelin/hardhat-upgrades';

const isMatic = () => process.env.MATIC === "true";

const getMochaBeforeAll: Mocha.AsyncFunc = async function () {
  const { mochaBeforeAll } = await import("./test/setup");
  this.isMatic = isMatic;
  await mochaBeforeAll.bind(this)();
}

const getMochaAfterAll: Mocha.AsyncFunc = async function () {
  const { mochaAfterAll } = await import("./test/setup");
  this.isMatic = isMatic;
  await mochaAfterAll.bind(this)();
}

// Ensure that we have all the environment variables we need.
let mnemonic: string;
if (!process.env.MNEMONIC) {
  throw new Error("Please set your MNEMONIC in a .env file");
} else {
  mnemonic = process.env.MNEMONIC;
}

function createLocalHostConfig() {
  const url: string = "http://localhost:8545";
  return {
    accounts: {
      count: 10,
      initialIndex: 0,
      mnemonic,
      path: "m/44'/60'/0'/0",
    },
    url,
    saveDeployments: false,
  };
}

const mochaGrep = isMatic()
  ? new RegExp("@matic|@both")
  : new RegExp("@non-matic|@both");

const config: HardhatUserConfig = {
  namedAccounts: {
    deployer: {
      default: 0,
    },
    admin: {
      default: 1,
    },
  },
  defaultNetwork: "localhost",
  networks: {
    localhost: createLocalHostConfig(),
  },
  solidity: {
    version: "0.8.4",
    settings: {
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  mocha: {
    grep: mochaGrep,
    rootHooks: {
      beforeAll: getMochaBeforeAll,
      afterAll: getMochaAfterAll,
    },
  },
};

export default config;
