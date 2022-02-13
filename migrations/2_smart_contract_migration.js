import { artifacts } from 'truffle';

const NFT = artifacts.require('NFT');
require('dotenv').config();

const name = process.env.CONTRACT_NAME;
const symbol = process.env.CONTRACT_SYMBOL;
const baseUri = process.env.BASE_URI;
const baseUriSecondary = process.env.BASE_URI_SECONDARY;
const baseUriThird = process.env.BASE_URI_THIRD;
const baseUriForth = process.env.BASE_URI_FORTH;

module.exports = function (deployer) {
  deployer.deploy(
    NFT,
    name,
    symbol,
    baseUri,
    baseUriSecondary,
    baseUriThird,
    baseUriForth
  );
};
