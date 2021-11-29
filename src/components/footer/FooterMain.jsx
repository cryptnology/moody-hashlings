import { motion } from 'framer-motion';
import youTube from '../../images/youtube.svg';
import twitter from '../../images/twitter.svg';
import linkedin from '../../images/linkedin.svg';
import gitHub from '../../images/github.svg';
import logo from '../../images/cryptnology.jpeg';
import website from '../../images/website.png';

const FooterMain = () => {
  return (
    <div className='footer px-4'>
      <div className='container mx-auto '>
        <div className='flex items-center py-4'>
          {/* <motion.img
            className='social-icons'
            initial={{ y: 250 }}
            animate={{ y: 0 }}
            transition={{ delay: 1.4, type: 'spring', stiffness: 50 }}
            whileHover={{ scale: 1.2 }}
            className='mr-2 rounded-full h-8 w-8'
            alt='logo'
            src={logo}
          /> */}
          <motion.h1
            initial={{ y: 250 }}
            animate={{ y: 0 }}
            transition={{ delay: 1.6, type: 'spring', stiffness: 50 }}
            className='social-icons hidden'
          >
            <a
              href='http://www.cryptnology.dev'
              target='_blank'
              rel='noopener noreferrer'
            >
              cryptnology.dev
            </a>
          </motion.h1>
          <div className='flex mx-auto'>
            <motion.div
              initial={{ y: 250 }}
              animate={{ y: 0 }}
              transition={{ delay: 2, type: 'spring', stiffness: 50 }}
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
              className='ml-4'
              initial={{ y: 250 }}
              animate={{ y: 0 }}
              transition={{ delay: 2, type: 'spring', stiffness: 50 }}
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
              className='mx-4'
              initial={{ y: 250 }}
              animate={{ y: 0 }}
              transition={{ delay: 2.2, type: 'spring', stiffness: 50 }}
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
              initial={{ y: 250 }}
              animate={{ y: 0 }}
              transition={{ delay: 2.4, type: 'spring', stiffness: 50 }}
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
              className='ml-4'
              initial={{ y: 250 }}
              animate={{ y: 0 }}
              transition={{ delay: 2.6, type: 'spring', stiffness: 50 }}
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
        </div>
      </div>
    </div>
  );
};

export default FooterMain;
