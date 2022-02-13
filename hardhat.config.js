require('dotenv').config()
require("@nomiclabs/hardhat-waffle");

const ROPSTEN_ALCHEMY_API_KEY = process.env.ROPSTEN_ALCHEMY_API_KEY// || 'a2nwStflRL8MEm9qz1H1Of9xmV-aioGI';
const ROPSTEN_PRIVATE_KEY = process.env.ROPSTEN_PRIVATE_KEY// || '604a35b1a29e7d29fd0816e3445f0188a9097d2d795011261fd76afc444887b7'
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ROPSTEN_ALCHEMY_API_KEY}`,
      accounts: [`${ROPSTEN_PRIVATE_KEY}`]
    }
  }
};
