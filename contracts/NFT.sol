// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract NFT is ERC721Enumerable, Ownable {
  using Strings for uint256;

  string public baseURI;
  string public baseUriSecondary;
  string public baseExtension = '.json';
  uint256 public cost = 0.1 ether;
  uint256 public maxSupply = 1000;
  uint256 public maxMintAmount = 20;
  uint256 public nftPerAddressLimit = 3;
  bool public paused = false;
  bool public onlyWhitelisted = false;
  address[] public whitelistedAddresses;
  mapping(address => uint256) public addressMintedBalance;
  mapping(uint256 => Token) private tokenToOwner;

  constructor(
    string memory _name,
    string memory _symbol,
    string memory _initBaseURI,
    string memory _initbaseUriSecondary
  ) ERC721(_name, _symbol) {
    setBaseURI(_initBaseURI);
    setBaseUriSecondary(_initbaseUriSecondary);
  }

  struct Token {
    address owner;
    uint256 itemId;
    bool changeUri;
  }

  // internal
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

  function _baseUriSecondary() internal view returns (string memory) {
    return baseUriSecondary;
  }

  // public
  function mint(uint256 _mintAmount) public payable {
    require(!paused, 'the contract is paused');
    uint256 supply = totalSupply();
    require(_mintAmount > 0, 'need to mint at least 1 NFT');
    require(
      _mintAmount <= maxMintAmount,
      'max mint amount per session exceeded'
    );
    require(supply + _mintAmount <= maxSupply, 'max NFT limit exceeded');

    if (msg.sender != owner()) {
      if (onlyWhitelisted == true) {
        require(isWhitelisted(msg.sender), 'user is not whitelisted');
        uint256 ownerMintedCount = addressMintedBalance[msg.sender];
        require(
          ownerMintedCount + _mintAmount <= nftPerAddressLimit,
          'max NFT per address exceeded'
        );
      }
      require(msg.value >= cost * _mintAmount, 'insufficient funds');
    }

    for (uint256 i = 1; i <= _mintAmount; i++) {
      addressMintedBalance[msg.sender]++;
      _safeMint(msg.sender, supply + i);
    }

    tokenToOwner[totalSupply()] = Token(msg.sender, totalSupply(), false);
  }

  function isWhitelisted(address _user) public view returns (bool) {
    for (uint256 i = 0; i < whitelistedAddresses.length; i++) {
      if (whitelistedAddresses[i] == _user) {
        return true;
      }
    }
    return false;
  }

  function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
  {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory tokenIds = new uint256[](ownerTokenCount);
    for (uint256 i; i < ownerTokenCount; i++) {
      tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
    }
    return tokenIds;
  }

  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(tokenId),
      'ERC721Metadata: URI query for nonexistent token'
    );

    bool changeUri = tokenToOwner[tokenId].changeUri;
    uint256 itemId = tokenToOwner[tokenId].itemId;

    if (tokenId == itemId && changeUri) {
      string memory currentbaseUriSecondary = _baseUriSecondary();
      return
        bytes(currentbaseUriSecondary).length > 0
          ? string(
            abi.encodePacked(
              currentbaseUriSecondary,
              tokenId.toString(),
              baseExtension
            )
          )
          : '';
    } else {
      string memory currentBaseURI = _baseURI();
      return
        bytes(currentBaseURI).length > 0
          ? string(
            abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension)
          )
          : '';
    }
  }

  function changeBaseURI(uint256 tokenId) public {
    require(msg.sender == ownerOf(tokenId), 'Not the owner');
    require(
      _exists(tokenId),
      'ERC721Metadata: URI query for nonexistent token'
    );

    bool changeUri = tokenToOwner[tokenId].changeUri;

    if (changeUri) {
      tokenToOwner[tokenId].changeUri = false;
    } else {
      tokenToOwner[tokenId].changeUri = true;
    }
  }

  //only owner
  function setNftPerAddressLimit(uint256 _limit) public onlyOwner {
    nftPerAddressLimit = _limit;
  }

  function setCost(uint256 _newCost) public onlyOwner {
    cost = _newCost;
  }

  function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
    maxMintAmount = _newmaxMintAmount;
  }

  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

  function setBaseUriSecondary(string memory _newbaseUriSecondary)
    public
    onlyOwner
  {
    baseUriSecondary = _newbaseUriSecondary;
  }

  function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
    baseExtension = _newBaseExtension;
  }

  function pause(bool _state) public onlyOwner {
    paused = _state;
  }

  function setOnlyWhitelisted(bool _state) public onlyOwner {
    onlyWhitelisted = _state;
  }

  function whitelistUsers(address[] calldata _users) public onlyOwner {
    delete whitelistedAddresses;
    whitelistedAddresses = _users;
  }

  function withdraw() public payable onlyOwner {
    (bool os, ) = payable(owner()).call{ value: address(this).balance }('');
    require(os);
  }
}
