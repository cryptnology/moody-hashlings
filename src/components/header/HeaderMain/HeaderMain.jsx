import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import disconnect from 'images/shutdown.png';
import burgerMenu from 'images/burgerMenu.svg';

import { BlockchainDetails, BurgerMenu } from './components';

export function HeaderMain({ account, network, balance }) {
  const menu = e => {
    e.preventDefault();
    const menu = document.querySelector('#menu');

    if (menu.classList.contains('hidden')) menu.classList.remove('hidden');
    else menu.classList.add('hidden');
  };

  return (
    <div className='header px-4'>
      <header className='container xsm:mx-auto'>
        <div className='flex justify-between xsm:justify-center py-4 items-center'>
          <motion.div
            initial={{ y: -250 }}
            animate={{ y: 0 }}
            transition={{
              delay: 1.4,
              type: 'spring',
              stiffness: 50,
            }}
            className='cursor-pointer lg:hidden xsm:mr-5'
          >
            <motion.img
              onClick={e => menu(e)}
              src={burgerMenu}
              alt='Burger menu'
              width={35}
              whileHover={{ scale: 1.2 }}
            />
          </motion.div>
          <h1 className='font-title text-themeLightBlue text-2xl'>
            MOODY HASHLINGS
          </h1>
          <div className='hidden lg:inline-flex'>
            <ul className='flex'>
              <motion.li
                initial={{ y: -250 }}
                animate={{ y: 0 }}
                transition={{
                  delay: 1.4,
                  type: 'spring',
                  stiffness: 50,
                }}
                className='ml-5'
              >
                <Link
                  className='font-title text-lg  text-themeLightBlue'
                  to='/home'
                >
                  <motion.button
                    className=' tracking-widest'
                    whileHover={{ scale: 1.2 }}
                  >
                    Home
                  </motion.button>
                </Link>
              </motion.li>
              <motion.li
                initial={{ y: -250 }}
                animate={{ y: 0 }}
                transition={{
                  delay: 1.2,
                  type: 'spring',
                  stiffness: 50,
                }}
                className='ml-5 font-title text-lg text-themeLightBlue'
              >
                <Link to='/page'>
                  <motion.button
                    className=' tracking-widest'
                    whileHover={{ scale: 1.2 }}
                  >
                    Page
                  </motion.button>
                </Link>
              </motion.li>
            </ul>
          </div>
          <ul className='flex text-lg items-center xsm:ml-auto'>
            <BlockchainDetails
              account={account}
              network={network}
              balance={balance}
            />
            <motion.li
              initial={{ y: -250 }}
              animate={{ y: 0 }}
              transition={{
                delay: 0.2,
                type: 'spring',
                stiffness: 50,
              }}
            >
              <a
                href={'#/'}
                onClick={() => {
                  window.location.reload();
                }}
              >
                <motion.img
                  whileHover={{ scale: 1.2 }}
                  width={40}
                  src={disconnect}
                  alt='Disconnect your wallet'
                />
              </a>
            </motion.li>
          </ul>
        </div>
        <BurgerMenu
          account={account}
          network={network}
          balance={balance}
          menu={menu}
        />
      </header>
    </div>
  );
}
