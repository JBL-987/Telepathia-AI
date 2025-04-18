import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
const config = {
  solidity: "0.8.28",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    Lisk_Mainnet: {
      url: process.env.LISK_MAINNET_URL || "https://rpc.mainnet.lisk.com",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 1136600000
    },
    Lisk_Sepolia_Testnet: {
      url: process.env.LISK_SEPOLIA_URL || "https://rpc.sepolia.lisk.com",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 4202
    }
  }
};

export default config;
