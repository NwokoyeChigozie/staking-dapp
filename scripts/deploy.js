const hre = require("hardhat");
const { deploy, verifyContract, sleep } = require("./helpful_scripts");

async function main() {
  console.log("Deploying Contract...");
  const greg_token = await deploy("GregToken");
  await sleep(1500 * 60);

  console.log("verifying Contract...");
  // 0x7db05ddd15153f902fd24a677bd3ed23454cb605;
  // await verifyContract(
  //   "GregToken",
  //   "0x7dB05ddD15153F902fd24a677Bd3ED23454cB605"
  // );
  await verifyContract("GregToken", greg_token.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
