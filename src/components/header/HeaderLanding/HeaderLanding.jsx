import { motion } from 'framer-motion';

import { SocialLinks, ConnectWallet } from '../../common';

export function HeaderLanding({ connect, dispatch }) {
  return (
    <div className='header px-4'>
      <header className='container mx-auto '>
        <motion.div
          className='flex py-4 justify-between items-center'
          initial={{ y: -250 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 50 }}
        >
          <h1 className='font-title text-themeLightBlue text-2xl'>
            MOODY HASHLINGS
          </h1>
          <div className='hidden md:flex'>
            <SocialLinks />
          </div>
          <ConnectWallet connect={connect} dispatch={dispatch} />
        </motion.div>
      </header>
    </div>
  );
}
