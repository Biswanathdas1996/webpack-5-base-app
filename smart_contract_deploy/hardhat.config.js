require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-etherscan");

//  npx hardhat run --network goerli scripts/deploy.js

const SEPOLIA_RPC_URL =
  "https://sepolia.infura.io/v3/24022fda545f41beb59334bdbaf3ef32";

const ETHERSCAN_API_KEY = "WCVDU52748WW4F7EKDEDB89HKH41BIA4N2";
// optional
const PRIVATE_KEY =
  "82e4fb5555837b975e4402a02c2fbe230ae7d4d61574ee00ed2b1ff79be84195";

module.exports = {
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    local: {
      url: "http://127.0.0.1:8545/",
    },
    // goerli: {
    //   url: GOERLI_RPC_URL,
    //   accounts: [PRIVATE_KEY],
    //   // accounts: {
    //   //   mnemonic: MNEMONIC,
    //   // },
    //   saveDeployments: true,
    // },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      // accounts: {
      //   mnemonic: MNEMONIC,
      // },
      saveDeployments: true,
    },
  },
  solidity: "0.8.13",
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
    feeCollector: {
      default: 1,
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "../src/web3/ABI/artifacts",
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
};
