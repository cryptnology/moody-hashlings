import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import wallet from '../../images/wallet.png';
import youTube from '../../images/youtube.svg';
import twitter from '../../images/twitter.svg';
import linkedin from '../../images/linkedin.svg';
import gitHub from '../../images/github.svg';
import website from '../../images/website.png';

const HeaderLanding = ({ connect, dispatch }) => {
  return (
    <div className='header px-4'>
      <header className='container mx-auto '>
        <motion.div
          className='flex py-4 items-center'
          initial={{ y: -250 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 50 }}
        >
          {/* <img className='mr-3 rounded-full h-7 w-7' alt='logo' src={logo} /> */}
          <h1 className='font-title text-themeLightBlue text-2xl'>
            MOODY HASHLINGS
          </h1>

          <div className='flex ml-auto mr-24'>
            <motion.div
              className='mr-4 hidden sm:inline-flex'
              initial={{ y: -250 }}
              animate={{ y: 0 }}
              transition={{ delay: 2.8, type: 'spring', stiffness: 50 }}
            >
              <a
                href='http://www.cryptnology.dev'
                target='_blank'
                rel='noopener noreferrer'
              >
                <motion.img
                  whileHover={{ scale: 1.2 }}
                  width={40}
                  src={website}
                  alt='Website image'
                />
              </a>
            </motion.div>
            <motion.div
              className='mr-4 hidden sm:inline-flex'
              initial={{ y: -250 }}
              animate={{ y: 0 }}
              transition={{ delay: 2.6, type: 'spring', stiffness: 50 }}
            >
              <a
                href='https://github.com/cryptnology'
                target='_blank'
                rel='noopener noreferrer'
              >
                <motion.img
                  whileHover={{ scale: 1.2 }}
                  width={40}
                  src={gitHub}
                  alt='GitHub logo'
                />
              </a>
            </motion.div>
            <motion.div
              className='hidden sm:inline-flex'
              initial={{ y: -250 }}
              animate={{ y: 0 }}
              transition={{ delay: 2.4, type: 'spring', stiffness: 50 }}
            >
              <a
                href='https://www.linkedin.com/in/jamie-anderson-121061200/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <motion.img
                  whileHover={{ scale: 1.2 }}
                  width={40}
                  src={linkedin}
                  alt='Linkedin logo'
                />
              </a>
            </motion.div>
            <motion.div
              className='mx-4 hidden sm:inline-flex'
              initial={{ y: -250 }}
              animate={{ y: 0 }}
              transition={{ delay: 2.2, type: 'spring', stiffness: 50 }}
            >
              <a
                href='https://twitter.com/CryptnologyDev'
                target='_blank'
                rel='noopener noreferrer'
              >
                <motion.img
                  whileHover={{ scale: 1.2 }}
                  width={40}
                  src={twitter}
                  alt='Twitter logo'
                />
              </a>
            </motion.div>
            <motion.div
              className='hidden sm:inline-flex'
              initial={{ y: -250 }}
              animate={{ y: 0 }}
              transition={{ delay: 2, type: 'spring', stiffness: 50 }}
            >
              <a
                href='https://www.youtube.com/channel/UCNkysjhjqXLpfONboDG1E_Q'
                target='_blank'
                rel='noopener noreferrer'
              >
                <motion.img
                  whileHover={{ scale: 1.2 }}
                  width={40}
                  src={youTube}
                  alt='YouTube logo'
                />
              </a>
            </motion.div>
          </div>
          <ul className='ml-auto'>
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
          </ul>
        </motion.div>
      </header>
    </div>
  );
};

export default HeaderLanding;
