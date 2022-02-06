import React from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import { BlockchainDetails } from './BlockchainDetails';

export function BurgerMenu({ account, network, balance, menu }) {
  return (
    <div className='hidden lg:hidden' id='menu'>
      <ul className='flex text-lg justify-center'>
        <li onClick={e => menu(e)}>
          <Link to='/home'>
            <motion.button
              className=' tracking-widest'
              whileHover={{ scale: 1.2 }}
            >
              Home
            </motion.button>
          </Link>
        </li>
        <li onClick={e => menu(e)} className='ml-5 '>
          <Link to='/page'>
            <motion.button
              className=' tracking-widest'
              whileHover={{ scale: 1.2 }}
            >
              Page
            </motion.button>
          </Link>
        </li>
      </ul>
      <ul className='flex text-lg justify-center mt-2'>
        <BlockchainDetails
          account={account}
          network={network}
          balance={balance}
          burgerMenu
        />
      </ul>
    </div>
  );
}
