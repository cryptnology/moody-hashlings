import React from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import wallet from 'images/wallet.png';

export function ConnectWallet({ connect, dispatch }) {
  return (
    <>
      <Link
        to={'/home'}
        onClick={e => {
          e.preventDefault();
          dispatch(connect());
        }}
      >
        <motion.div
          initial={{ y: -250 }}
          animate={{ y: 0 }}
          transition={{
            delay: 1.2,
            type: 'spring',
            stiffness: 50,
          }}
        >
          <motion.img
            whileHover={{ scale: 1.2 }}
            width={40}
            src={wallet}
            alt='Connect a wallet'
          />
        </motion.div>
      </Link>
    </>
  );
}
