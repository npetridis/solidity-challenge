// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const Petrideum = await hre.ethers.getContractFactory("Petrideum");
  const petrideum = await Petrideum.deploy();
  await petrideum.deployed();
  console.log("Petrideum deployed to:", petrideum.address);

  const Logger = await hre.ethers.getContractFactory("Logger");
  const logger = await Logger.deploy();
  await logger.deployed();
  console.log("Logger deployed to:", logger.address);

  const TokenDepositor = await hre.ethers.getContractFactory("TokenDepositor");
  const tokenDepositor = await TokenDepositor.deploy(logger.address);
  await tokenDepositor.deployed();
  console.log("TokenDepositor deployed to:", tokenDepositor.address);

  await logger.updateTokenDepositorContract(tokenDepositor.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
