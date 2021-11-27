#!/usr/bin/env bash

# Deploy Contracts on Rinkeby
truffle migrate --reset --network rinkeby

# Deploy Contracts on Polygon Mumbai
# truffle migrate --reset --network mumbai

# Verify Contracts on Etherscan
truffle run verify NFT --network rinkeby --license SPDX-License-Identifier

# Verify Contracts on Polygonscan
# truffle run verify SmartContract --network mumbai --license SPDX-License-Identifier

# Flatten Contracts
# ./node_modules/.bin/truffle-flattener contracts/NFT.sol > flats/NFT_flat.sol