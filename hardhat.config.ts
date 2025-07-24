import path from "path";
import { HardhatUserConfig } from "hardhat/config";
import "@fhevm/hardhat-plugin";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.24",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          viaIR: true,
        },
      },
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/1b48e5a7fb4f4783a967b1d2f705e410",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 11155111,
    },
  },
  custom: {
    solcJsPath: path.resolve(__dirname, "node_modules", "solc", "soljson.js"),
  },
};

export default config;
