// https://eth-ropsten.alchemyapi.io/v2/XyOaM61TEpQiTzSKAMYUbExK3PUBqN4p

require('@nomiclabs/hardhat-waffle');
require("dotenv").config();

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/XyOaM61TEpQiTzSKAMYUbExK3PUBqN4p',
      accounts: [process.env.ETH_ROPSTEN_PRIV_KEY]
    }
  }
}