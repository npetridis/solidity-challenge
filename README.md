# Description

The contracts are deployed in Ropsten network:
* Logger contract address: 
```
0x453729a305c6fA8FC2A90f091358c0D789389119
```
* TokenDepositor contract address:
```
0x36fF438d78757565D1d50FD425b2b2EEa0A71261
```

# Unit tests

Run unit tests with
```
npx hardhat test
```

# Deploy contracts to network
## Ropsten deployment:
* Copy `.env.example` and rename it to `.env`
* Add your alchemy key and ropsten account private key (thas has ropsten ether)
* Run:
```
npx hardhat run scripts/deploy.js --network ropsten
```
## Local hardhat node
```
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
