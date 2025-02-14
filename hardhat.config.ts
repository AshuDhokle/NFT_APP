import 'dotenv/config'
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import '@nomicfoundation/hardhat-ethers'
import 'hardhat-deploy'
const config: HardhatUserConfig = {
  solidity: "0.8.28",
  defaultNetwork: 'hardhat',
  networks:{
    sepolia:{
      chainId: 11155111,
      url: process.env.SE_RPC_URL,
      accounts: [`0x${process.env.SE_PRIVATE_KEY}`]
    }
  },
  etherscan:{
    apiKey: process.env.ETHERSCAN_API,
  },
  namedAccounts:{
    'deployer':{
      default : 0
    }
  }
};

export default config;
