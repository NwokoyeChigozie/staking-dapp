const { ethers } = require("hardhat");
const hre = require("hardhat");

let sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function deploy(contractName) {
  const cContract = await ethers.getContractFactory(contractName);
  let c_contract = await cContract.deploy();
  await c_contract.deployed(2);
  console.log(
    `Contract ${contractName} deployed to address: ${c_contract.address}`
  );
  return c_contract;
}

async function verifyContract(contract, _address) {
  let verify = await hre.run("verify:verify", {
    address: _address,
    constructorArguments: [],
  });
  console.log(`successfuly verified ${contract}`);
  return verify;
}

module.exports = { deploy, verifyContract, sleep };
