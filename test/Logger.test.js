const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Logger", function () {
  let logger;
  let tokenDepositor;
  let petrideum;

  this.beforeAll(async () => {
    const Petrideum = await hre.ethers.getContractFactory("Petrideum");
    petrideum = await Petrideum.deploy();
    await petrideum.deployed();

    const Logger = await ethers.getContractFactory("Logger");
    logger = await Logger.deploy();
    await logger.deployed();

    const TokenDepositor = await hre.ethers.getContractFactory("TokenDepositor");
    tokenDepositor = await TokenDepositor.deploy(logger.address);
    await tokenDepositor.deployed();

    await logger.updateTokenDepositorContract(tokenDepositor.address);

    console.log('Deployment is complete', ethers.BigNumber.from("100"));
  })

  it("recordDeposit(address,address,uint256) is called only from tokenDepositor contract", async function () {
    await petrideum.approve(tokenDepositor.address, 100);
    await tokenDepositor.depositToken(petrideum.address, 100);

    const [_, signer2] = await ethers.getSigners();

    try {
      await logger.connect(signer2)['recordDeposit(address,address,uint256)'](signer2.address, petrideum.address, 100);
    } catch (error) {
      expect(error.message.includes('Only tokenDepositorContract has access')).to.be.true;
    }
  });

  it("only contract deployer can call recordDeposit(address, uint256)", async function () {
    await petrideum.approve(tokenDepositor.address, 100);

    const [_, signer2] = await ethers.getSigners();

    await logger['recordDeposit(address,uint256)'](petrideum.address, 100);

    try {
      await logger.connect(signer2)['recordDeposit(address,uint256)'](petrideum.address, 100);
    } catch (error) {
      expect(error.message.includes('Ownable: caller is not the owner')).to.be.true;
    }
  });
});
