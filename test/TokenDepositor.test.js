const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenDepositor", function () {
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

  it("deposits erc20 token", async function () {
    await petrideum.approve(tokenDepositor.address, 100);
    await tokenDepositor.depositToken(petrideum.address, 100);

    const [owner] = await ethers.getSigners();

    expect(await petrideum.balanceOf(tokenDepositor.address)).to.equal(100);

    const [tokensArray, ammountsArray] = await logger.getTokens(owner.address);
    expect(tokensArray[0]).to.equal(petrideum.address);
    expect(ammountsArray[0]).to.equal({
      "_hex": `0x${Number(100).toString(16)}`,
      "_isBigNumber": true
    });
  });

  it('only allows the owner of the contract to call updateLoggerContract', async () => {
    const Logger = await ethers.getContractFactory("Logger");
    const newLogger = await Logger.deploy();
    await tokenDepositor.updateLoggerContract(newLogger.address)

    const [_, signer2] = await ethers.getSigners();
    try {
      await tokenDepositor.connect(signer2).updateLoggerContract(newLogger.address)
    } catch (error) {
      expect(error.message.includes('Ownable: caller is not the owner')).to.be.true;
    }
  });

  it('only accepts valid addresses for updateLoggerContract', async () => {
    try {
      await tokenDepositor.updateLoggerContract('0x2123456789');
    } catch (error) {
      expect(error.message.includes('invalid address')).to.be.true;
    }
  })
});
