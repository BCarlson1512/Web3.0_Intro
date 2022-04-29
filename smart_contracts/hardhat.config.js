// https://eth-ropsten.alchemyapi.io/v2/XyOaM61TEpQiTzSKAMYUbExK3PUBqN4p

require('@nomiclabs/hardhat-waffle');
require("dotenv").config();

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: process.env.ETH_API_KEY,
      accounts: [`0x${process.env.ETH_ROPSTEN_PRIV_KEY}`]
    }
  }
}