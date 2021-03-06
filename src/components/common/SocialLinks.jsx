import React from 'react';

import { motion } from 'framer-motion';

import youTube from 'images/youtube.svg';
import twitter from 'images/twitter.svg';
import linkedin from 'images/linkedin.svg';
import gitHub from 'images/github.svg';
import website from 'images/website.png';

export function SocialLinks({ footer }) {
  return (
    <>
      <motion.div
        className='mr-4'
        initial={footer ? { y: 250 } : { y: -250 }}
        animate={{ y: 0 }}
        transition={
          footer
            ? { delay: 2, type: 'spring', stiffness: 50 }
            : { delay: 2.8, type: 'spring', stiffness: 50 }
        }
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
        className='mr-4'
        initial={footer ? { y: 250 } : { y: -250 }}
        animate={{ y: 0 }}
        transition={
          footer
            ? { delay: 2.2, type: 'spring', stiffness: 50 }
            : { delay: 2.6, type: 'spring', stiffness: 50 }
        }
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
        initial={footer ? { y: 250 } : { y: -250 }}
        animate={{ y: 0 }}
        transition={
          footer
            ? { delay: 2.4, type: 'spring', stiffness: 50 }
            : { delay: 2.4, type: 'spring', stiffness: 50 }
        }
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
        className='mx-4'
        initial={footer ? { y: 250 } : { y: -250 }}
        animate={{ y: 0 }}
        transition={
          footer
            ? { delay: 2.6, type: 'spring', stiffness: 50 }
            : { delay: 2.2, type: 'spring', stiffness: 50 }
        }
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
        initial={footer ? { y: 250 } : { y: -250 }}
        animate={{ y: 0 }}
        transition={
          footer
            ? { delay: 2.8, type: 'spring', stiffness: 50 }
            : { delay: 2, type: 'spring', stiffness: 50 }
        }
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
    </>
  );
}
