import React from 'react';

import { motion } from 'framer-motion';

export function BlockchainDetails({ account, network, balance, burgerMenu }) {
  const blockchainExplorerURL = account => {
    if (network === 'Rinkeby') {
      return `https://rinkeby.etherscan.io/address/${account}`;
    } else if (network === 'Kovan') {
      return `https://kovan.etherscan.io/address/${account}`;
    } else return `https://mumbai.polygonscan.com/address/${account}`;
  };

  return (
    <>
      <motion.li
        initial={{ y: -250 }}
        animate={{ y: 0 }}
        transition={{
          delay: 1,
          type: 'spring',
          stiffness: 50,
        }}
        className={`${
          burgerMenu ? '' : 'hidden lg:inline-flex mr-5'
        } font-title text-themeLightBlue`}
      >
        {network}
      </motion.li>
      <motion.li
        initial={{ y: -250 }}
        animate={{ y: 0 }}
        transition={{
          delay: 0.8,
          type: 'spring',
          stiffness: 50,
        }}
        className={`${
          burgerMenu ? 'sm:hidden ml-5' : 'hidden sm:inline-flex'
        } font-title text-themeLightBlue mr-1`}
      >
        {balance}
      </motion.li>
      <motion.li
        initial={{ y: -250 }}
        animate={{ y: 0 }}
        transition={{
          delay: 0.6,
          type: 'spring',
          stiffness: 50,
        }}
        className={`${
          burgerMenu ? 'sm:hidden ml-1 mr-5' : 'hidden sm:inline-flex mr-5'
        } font-title font-bold text-themeLightBlue`}
      >
        {network === 'Rinkeby' ? 'ETH' : 'MATIC'}
      </motion.li>
      <motion.li
        initial={{ y: -250 }}
        animate={{ y: 0 }}
        transition={{
          delay: 0.4,
          type: 'spring',
          stiffness: 50,
        }}
      >
        <motion.button whileHover={{ scale: 1.2 }}>
          <a
            className={`${
              burgerMenu ? 'xsm:hidden' : 'hidden xsm:inline-flex mr-5'
            } font-title tracking-widest text-themeLightBlue`}
            href={blockchainExplorerURL(account)}
            target='_blank'
            rel='noopener noreferrer'
          >
            {account.slice(0, 5) + '...' + account.slice(38, 42)}
          </a>
        </motion.button>
      </motion.li>
    </>
  );
}
