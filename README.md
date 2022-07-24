# Front-end for a Crowd Funding Applicaton

This is a basic localhost website for my [hardhat-fund-me](https://github.com/nvtrinh2001/hardhat-fund-me) application. It allows users to interact with the smart contracts through MetaMask wallet.

## Key Features

- Connect to MetaMask
- Get the balance of the fund
- Funding
- Withdrawing

# Getting Started

## Requirements

- git
- Node.js
- yarn

## Building

First, clone my [hardhat-fund-me](https://github.com/nvtrinh2001/hardhat-fund-me) to your local machine:

```
git clone git@github.com:nvtrinh2001/hardhat-fund-me.git
cd hardhat-fund-me
yarn
yarn hardhat
```

Then, run:

```
yarn hardhat node
```

Copy the contract deployment address to `contractAddress` in _constants.js_ file

Copy an account private key that hardhat gives you and import it into MetaMask wallet

Add a new network in MetaMask:

```
Network Name: hardhat-localhost
New RPC URL: <see in the terminal>
Chain ID: 31337
Current Symbol: ETH
```

Using Live Server to open your application via a web browser. For example:

```
http://127.0.0.1:5500/html-fund-me/index.html
```
