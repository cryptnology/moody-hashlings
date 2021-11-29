import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import disconnect from '../../images/shutdown.png';
import burgerMenu from '../../images/burgerMenu.svg';

const HeaderMain = ({ account, network, balance }) => {
  const blockchainExplorerURL = account => {
    if (network === 'Rinkeby') {
      return `https://rinkeby.etherscan.io/address/${account}`;
    } else if (network === 'Kovan') {
      return `https://kovan.etherscan.io/address/${account}`;
    } else return `https://mumbai.polygonscan.com/address/${account}`;
  };

  const menu = e => {
    e.preventDefault();
    const menu = document.querySelector('#menu');

    if (menu.classList.contains('hidden')) menu.classList.remove('hidden');
    else menu.classList.add('hidden');
  };

  return (
    <div className='header px-4'>
      <header className='container mx-auto'>
        <div className='flex py-4 items-center'>
          <motion.div
            initial={{ y: -250 }}
            animate={{ y: 0 }}
            transition={{
              delay: 1.4,
              type: 'spring',
              stiffness: 50,
            }}
            className='cursor-pointer lg:hidden mr-5'
          >
            <motion.img
              onClick={e => menu(e)}
              src={burgerMenu}
              alt='Burger menu'
              width={35}
              whileHover={{ scale: 1.2 }}
            />
          </motion.div>
          {/* <img className='mr-3 rounded-full h-7 w-7' alt='logo' src={logo} /> */}
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
          <ul className='flex text-lg items-center ml-auto'>
            <motion.li
              initial={{ y: -250 }}
              animate={{ y: 0 }}
              transition={{
                delay: 1,
                type: 'spring',
                stiffness: 50,
              }}
              className='mr-5 hidden lg:inline-flex font-title text-themeLightBlue'
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
              className='mr-1 hidden sm:inline-flex font-title  text-themeLightBlue'
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
              className='mr-5 hidden sm:inline-flex font-title font-bold text-themeLightBlue'
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
              <motion.button
                whileHover={{ scale: 1.2 }}
                className='font-title text-white'
              >
                <a
                  className='font-title tracking-widest text-themeLightBlue  mr-5'
                  href={blockchainExplorerURL(account)}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {account.slice(0, 5) + '...' + account.slice(38, 42)}
                </a>
              </motion.button>
            </motion.li>
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
        <div className='hidden lg:hidden' id='menu'>
          <ul className='flex text-lg justify-center'>
            <li onClick={e => menu(e)}>
              <Link className='font-title  text-themeLightBlue' to='/home'>
                <motion.button
                  className=' tracking-widest'
                  whileHover={{ scale: 1.2 }}
                >
                  Home
                </motion.button>
              </Link>
            </li>
            <li
              onClick={e => menu(e)}
              className='ml-5 font-title text-themeLightBlue'
            >
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
        </div>
      </header>
    </div>
  );
};

export default HeaderMain;
