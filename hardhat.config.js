require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

const {
  RINKEBY_API_URL,
  PRIVATE_KEY,
  ETHERSCAN_API_KEY,
  PINATA_API_KEY,
  PINATA_SECRET_API_KEY,
} = process.env;

console.log(ETHERSCAN_API_KEY);
module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {},
    rinkeby: {
      url: RINKEBY_API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: `${ETHERSCAN_API_KEY}`,
  },
  paths: {
    artifacts: "./src/artifacts",
  },
};
