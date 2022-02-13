// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract NFT is ERC721Enumerable, Ownable {
  using Strings for uint256;

  string public baseURI;
  string public baseUriSecondary;
  string public baseUriThird;
  string public baseUriForth;
  string public baseExtension = '.json';
  uint256 public cost = 0.1 ether;
  uint256 public maxSupply = 1000;
  uint256 public maxMintAmount = 20;
  uint256 public nftPerAddressLimit = 3;
  bool public paused = false;
  bool public onlyWhitelisted = false;
  address[] public whitelistedAddresses;
  mapping(address => uint256) public addressMintedBalance;
  mapping(uint256 => Token) public tokenToOwner;

  constructor(
    string memory _name,
    string memory _symbol,
    string memory _initBaseURI,
    string memory _initbaseUriSecondary,
    string memory _initbaseUriThird,
    string memory _initbaseUriForth
  ) ERC721(_name, _symbol) {
    setBaseURI(_initBaseURI);
    setBaseUriSecondary(_initbaseUriSecondary);
    setBaseUriThird(_initbaseUriThird);
    setBaseUriForth(_initbaseUriForth);
  }

  struct Token {
    address owner;
    uint256 itemId;
    bool happy;
    bool sad;
    bool angry;
    bool tired;
  }

  // internal
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

  function _baseUriSecondary() internal view returns (string memory) {
    return baseUriSecondary;
  }

  function _baseUriThird() internal view returns (string memory) {
    return baseUriThird;
  }

  function _baseUriForth() internal view returns (string memory) {
    return baseUriForth;
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

    tokenToOwner[totalSupply()] = Token(
      msg.sender,
      totalSupply(),
      true,
      false,
      false,
      false
    );
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

  function tokenURI(uint256 _tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(_tokenId),
      'ERC721Metadata: URI query for nonexistent token'
    );

    bool happyMood = tokenToOwner[_tokenId].happy;
    bool sadMood = tokenToOwner[_tokenId].sad;
    bool angryMood = tokenToOwner[_tokenId].angry;

    if (happyMood) {
      string memory currentBaseUri = _baseURI();
      return
        bytes(currentBaseUri).length > 0
          ? string(
            abi.encodePacked(currentBaseUri, _tokenId.toString(), baseExtension)
          )
          : '';
    }
    if (sadMood) {
      string memory currentBaseUriSecondary = _baseUriSecondary();
      return
        bytes(currentBaseUriSecondary).length > 0
          ? string(
            abi.encodePacked(
              currentBaseUriSecondary,
              _tokenId.toString(),
              baseExtension
            )
          )
          : '';
    }
    if (angryMood) {
      string memory currentBaseUriThird = _baseUriThird();
      return
        bytes(currentBaseUriThird).length > 0
          ? string(
            abi.encodePacked(
              currentBaseUriThird,
              _tokenId.toString(),
              baseExtension
            )
          )
          : '';
    }
    string memory currentBaseUriForth = _baseUriForth();
    return
      bytes(currentBaseUriForth).length > 0
        ? string(
          abi.encodePacked(
            currentBaseUriForth,
            _tokenId.toString(),
            baseExtension
          )
        )
        : '';
  }

  function changeToHappyMood(uint256 _tokenId) public {
    require(msg.sender == ownerOf(_tokenId), 'Not the owner');
    require(
      _exists(_tokenId),
      'ERC721Metadata: URI query for nonexistent token'
    );
    require(!tokenToOwner[_tokenId].happy);

    tokenToOwner[_tokenId].happy = true;
    tokenToOwner[_tokenId].sad = false;
    tokenToOwner[_tokenId].angry = false;
    tokenToOwner[_tokenId].tired = false;
  }

  function changeToSadMood(uint256 _tokenId) public {
    require(msg.sender == ownerOf(_tokenId), 'Not the owner');
    require(
      _exists(_tokenId),
      'ERC721Metadata: URI query for nonexistent token'
    );
    require(!tokenToOwner[_tokenId].sad);

    tokenToOwner[_tokenId].happy = false;
    tokenToOwner[_tokenId].sad = true;
    tokenToOwner[_tokenId].angry = false;
    tokenToOwner[_tokenId].tired = false;
  }

  function changeToAngryMood(uint256 _tokenId) public {
    require(msg.sender == ownerOf(_tokenId), 'Not the owner');
    require(
      _exists(_tokenId),
      'ERC721Metadata: URI query for nonexistent token'
    );
    require(!tokenToOwner[_tokenId].angry);

    tokenToOwner[_tokenId].happy = false;
    tokenToOwner[_tokenId].sad = false;
    tokenToOwner[_tokenId].angry = true;
    tokenToOwner[_tokenId].tired = false;
  }

  function changeToTiredMood(uint256 _tokenId) public {
    require(msg.sender == ownerOf(_tokenId), 'Not the owner');
    require(
      _exists(_tokenId),
      'ERC721Metadata: URI query for nonexistent token'
    );
    require(!tokenToOwner[_tokenId].tired);

    tokenToOwner[_tokenId].happy = false;
    tokenToOwner[_tokenId].sad = false;
    tokenToOwner[_tokenId].angry = false;
    tokenToOwner[_tokenId].tired = true;
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

  function setBaseUriThird(string memory _newbaseUriThird) public onlyOwner {
    baseUriThird = _newbaseUriThird;
  }

  function setBaseUriForth(string memory _newbaseUriForth) public onlyOwner {
    baseUriForth = _newbaseUriForth;
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
