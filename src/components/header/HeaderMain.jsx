import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import disconnect from '../../images/disconnect.svg';

const HeaderMain = ({ account, dispatch, connect, network, balance }) => {
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
          <div className='cursor-pointer lg:hidden mr-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 hover:text-themeYellow'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              onClick={e => menu(e)}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </div>
          {/* <img className='mr-3 rounded-full h-7 w-7' alt='logo' src={logo} /> */}
          <h1 className='font-title text-white text-xl'>Moody Hashlings</h1>
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
                className='ml-6'
              >
                <Link className='font-title text-white' to='/home'>
                  <span>Home</span>
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
                className='ml-3 font-title text-white'
              >
                <Link to='/page'>
                  <span>Page</span>
                </Link>
              </motion.li>
            </ul>
          </div>
          <ul className='flex items-center ml-auto'>
            <motion.li
              initial={{ y: -250 }}
              animate={{ y: 0 }}
              transition={{
                delay: 1,
                type: 'spring',
                stiffness: 50,
              }}
              className='mr-3 hidden lg:inline-flex font-title text-white'
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
              className='mr-1 hidden sm:inline-flex  text-white'
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
              className='mr-3 hidden sm:inline-flex font-title font-bold text-white'
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
                  className='font-title text-white text-lg'
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
          <ul className='flex justify-center'>
            <li className=' mr-4 mt-4' onClick={e => menu(e)}>
              <Link className='text-white' to='/home'>
                <span>Home</span>
              </Link>
            </li>
            <li className='mr-4 mt-4 text-white' onClick={e => menu(e)}>
              <Link to='/page'>
                <span>Page</span>
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default HeaderMain;
