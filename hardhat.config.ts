import { HardhatUserConfig } from "hardhat/types";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "dotenv/config";

const RINKEBY_RPC_URL =
  process.env.RINKEBY_RPC_URL ||
  "https://eth-rinkeby.alchemyapi.io/v2/your-api-key";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "privateKey";

const config: HardhatUserConfig = {
  networks: {
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 4,
    },
  },
  solidity: {
    version: "0.8.4",
  },
  namedAccounts: {
    deployer: 0,
  },
  paths: {
    sources: "src",
  },
};
export default config;
