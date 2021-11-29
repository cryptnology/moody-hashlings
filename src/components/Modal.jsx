import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import back from '../images/disconnect.svg';
import { Link } from 'react-router-dom';

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { y: '-100vh', opacity: 0 },
  hiddenClicked: { opacity: 0 },
  visible: {
    y: '350px',
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

const Modal = ({ errorMsg, showModal, setShowModal }) => {
  useEffect(() => {
    setShowModal(true);
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      {showModal && (
        <motion.div
          className='backdrop'
          variants={backdrop}
          initial='hidden'
          animate='visible'
          exit='hiddenClicked'
        >
          <motion.div className='modal' variants={modal}>
            <div className='modalButton'>
              <button onClick={() => setShowModal(false)}>
                <motion.img
                  whileHover={{ scale: 1.2 }}
                  src={back}
                  width={30}
                  alt='back button'
                />
              </button>
            </div>
            <p>{errorMsg}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
