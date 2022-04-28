# Web3.0_Intro

This project is a simple demonstration of ethereum transfer across accounts. This is achieved using smart contracts and metamask.

## Tech Stack

- React.js Frontend
- Solidity
- Hardhat
- Vite
## Running the program

- Clone the program and run npm i in both the smart contracts folder and the frontend folder
- Cd into client and run npm start

### Creating Smart Contracts

- Create a .env file within the smart contracts folder, input your eth wallet private key
- from the root directory run `npx hardhat run scripts/deploy.js`
- Copy your smart contract deployment address and update contractAddress within client/src/utils/constants.js
