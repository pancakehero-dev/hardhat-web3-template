/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-truffle5")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")


require('dotenv').config()

//task action function receives the Hardhat Runtime Environment as second argument
task("accounts", "Prints accounts", async (_, { web3 }) => {
  console.log(await web3.eth.getAccounts());
});

const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL || "http://rpc.ftm.tools/"
const TESTNET_RPC_URL = process.env.TESTNET_RPC_URL || "https://rpc.testnet.fantom.network/"

const MNEMONIC = process.env.MNEMONIC || "your mnemonic"

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
        // // If you want to do some forking, uncomment this
        // forking: {
        //   url: MAINNET_RPC_URL
        // }
    },
    localhost: {
      
    },
    testnet: {
        url: TESTNET_RPC_URL,
        // accounts: [PRIVATE_KEY],
        accounts: {
            mnemonic: MNEMONIC,
        },
        saveDeployments: true,
    },
    ganache: {
        url: 'http://localhost:8545',
        accounts: {
            mnemonic: MNEMONIC,
        }
    },
    mainnet: {
        url: MAINNET_RPC_URL,
        // accounts: [PRIVATE_KEY],
        accounts: {
            mnemonic: MNEMONIC,
        },
        saveDeployments: true,
    },
  },
  namedAccounts: {
    deployer: {
        default: 0,   // here this will by default take the first account as deployer
        1: 0          // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
  },
  solidity: {
    compilers: [
        {
            version: "0.8.4"
        }
    ]
  },
  mocha: {
    timeout: 100000
  }
};
