import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      viaIR: true,
      optimizer: {
      enabled: true,
      runs: 200,
      details: {
        yulDetails: {
          optimizerSteps: "u",
        },
      },
      },
    },
  },
};

export default config;
