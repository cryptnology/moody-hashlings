/* eslint-disable no-undef */
const NFT = artifacts.require('./NFT.sol');
const web3 = require('web3');

require('chai').use(require('chai-as-promised')).should();

contract('NFT', async ([deployer, user1, user2]) => {
  const name = 'NFT Collection';
  const symbol = 'NFTC';
  const baseUri = 'https://baseuri/';
  const baseUriSecondary = 'https://baseurisecondary/';
  const baseUriThird = 'https://baseurithird/';
  const baseUriForth = 'https://baseuriforth/';
  const price = web3.utils.toWei('0.1', 'ether');
  let nftContract;
  let nft;
  const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000';

  before(async () => {
    // Deploy contract
    nftContract = await NFT.new(
      name,
      symbol,
      baseUri,
      baseUriSecondary,
      baseUriThird,
      baseUriForth
    );
    // Mint an NFT
    nft = await nftContract.mint(1, { from: user1, value: price });
    nft2 = await nftContract.mint(1, { from: user2, value: price });
    nft3 = await nftContract.mint(1, { from: user1, value: price });
    // Whitelist users
    await nftContract.whitelistUsers([user1]);
  });

  describe('deployment', () => {
    it('tracks the name', async () => {
      const result = await nftContract.name();
      result.should.equal(name, 'name is correct');
    });
    it('tracks the symbol', async () => {
      const result = await nftContract.symbol();
      result.should.equal(symbol, 'symbol is correct');
    });
    it('tracks the owner of the contract', async () => {
      const result = await nftContract.owner();
      result.should.equal(deployer, 'owner is correct');
    });
    it('tracks the base uri', async () => {
      const result = await nftContract.baseURI();
      result.should.equal(baseUri, 'base uri is correct');
    });
    it('tracks the secondary base uri', async () => {
      const result = await nftContract.baseUriSecondary();
      result.should.equal(baseUriSecondary, 'base uri is correct');
    });
    it('tracks the third base uri', async () => {
      const result = await nftContract.baseUriThird();
      result.should.equal(baseUriThird, 'base uri is correct');
    });
    it('tracks the forth base uri', async () => {
      const result = await nftContract.baseUriForth();
      result.should.equal(baseUriForth, 'base uri is correct');
    });
    it('tracks the base extension', async () => {
      const baseExtension = '.json';
      const result = await nftContract.baseExtension();
      result.should.equal(baseExtension, 'base uri is correct');
    });
    it('tracks the price', async () => {
      const result = await nftContract.cost();
      result.toString().should.equal(price, 'price is correct');
    });
    it('tracks the max supply', async () => {
      const maxSupply = '1000';
      const result = await nftContract.maxSupply();
      result.toString().should.equal(maxSupply, 'max supply is correct');
    });
    it('tracks the max mint amount', async () => {
      const maxMintAmount = '20';
      const result = await nftContract.maxMintAmount();
      result.toString().should.equal(maxMintAmount, 'max supply is correct');
    });
    it('tracks the NFT per account limit', async () => {
      const nftPerAddressLimit = '3';
      const result = await nftContract.nftPerAddressLimit();
      result
        .toString()
        .should.equal(nftPerAddressLimit, 'max supply is correct');
    });
    it('tracks the paused status', async () => {
      const result = await nftContract.paused();
      result.should.equal(false, 'max supply is correct');
    });
    it('tracks the only whitelisted status', async () => {
      const result = await nftContract.onlyWhitelisted();
      result.should.equal(false, 'max supply is correct');
    });
  });

  describe('can whitelist addresses', () => {
    it('whitelists an address', async () => {
      const result1 = await nftContract.isWhitelisted(user1);
      const result2 = await nftContract.isWhitelisted(user2);
      result1.should.equal(true, 'user1 is whitelisted');
      result2.should.equal(false, 'user1 is whitelisted');
    });
  });

  describe('mints an nft', () => {
    it('emits a transfer event', async () => {
      log = nft.logs;
      let transfer = log[0];
      transfer.event.should.eq('Transfer');
      transfer = log[0].args;
      transfer.from.should.eq(ETHER_ADDRESS, 'from is correct');
      transfer.to.should.eq(user1, 'to is correct');
      transfer.tokenId.toString().should.eq('1');
    });
    it('tracks the token uri', async () => {
      const tokenId = 1;
      const result = await nftContract.tokenURI(tokenId);
      result.should.equal(`${baseUri}${tokenId}.json`, 'base uri is correct');
    });
  });

  describe('user can change nft image', () => {
    const tokenId = 1;
    const tokenId2 = 2;
    const tokenId3 = 3;

    it('changes the token uri', async () => {
      let tokenUri = await nftContract.tokenURI(tokenId, { from: user1 });
      tokenUri.should.equal(`${baseUri}${tokenId}.json`, 'base uri is correct');
      // Change the base uri to base uri secondary
      await nftContract.changeToSadMood(tokenId, { from: user1 });
      tokenUri = await nftContract.tokenURI(tokenId, { from: user1 });
      tokenUri.should.equal(
        `${baseUriSecondary}${tokenId}.json`,
        'secondary base uri is correct'
      );
      // Check that user 2 token uri has stayed the same
      tokenUri = await nftContract.tokenURI(tokenId2, { from: user2 });
      tokenUri.should.equal(
        `${baseUri}${tokenId2}.json`,
        'base uri is correct'
      );
      // Check that user 1 token 3 uri has stayed the same
      tokenUri = await nftContract.tokenURI(tokenId3, { from: user1 });
      tokenUri.should.equal(
        `${baseUri}${tokenId3}.json`,
        'base uri is correct'
      );
      // Change the base uri secondary back to base uri
      await nftContract.changeToHappyMood(tokenId, { from: user1 });
      tokenUri = await nftContract.tokenURI(tokenId, { from: user1 });
      tokenUri.should.equal(`${baseUri}${tokenId}.json`, 'base uri is correct');
    });
    it('rejects if not the owner', async () => {
      await nftContract.changeToHappyMood(tokenId, { from: user2 }).should.be
        .rejected;
    });
    it('rejects if changing a mood that has alreadly been assigned', async () => {
      await nftContract.changeToHappyMood(tokenId, { from: user1 }).should.be
        .rejected;
    });
  });

  describe('owner of contract can withdraw funds', () => {
    it('withdraws funds', async () => {
      // Rejected withdraw from not the owner
      await nftContract.withdraw({ from: user1 }).should.be.rejected;
      // Withdraw from the owner
      const result = await nftContract.withdraw();
      const from = result.receipt.from;
      const to = result.receipt.to;
      from
        .toUpperCase()
        .should.equal(deployer.toUpperCase(), 'from address is correct');
      to.toUpperCase().should.equal(
        nftContract.address.toUpperCase(),
        'to address is correct'
      );
    });
  });
});
