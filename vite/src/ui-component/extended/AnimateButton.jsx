import PropTypes from 'prop-types';

// third party
import { motion, useCycle } from 'framer-motion';

// ==============================|| ANIMATION BUTTON ||============================== //

export default function AnimateButton({ children, type = 'scale', direction = 'right', offset = 10, scale = { hover: 1, tap: 0.9 } }) {
  let offset1;
  let offset2;
  switch (direction) {
    case 'up':
    case 'left':
      offset1 = offset;
      offset2 = 0;
      break;
    case 'right':
    case 'down':
    default:
      offset1 = 0;
      offset2 = offset;
      break;
  }

  const [x, cycleX] = useCycle(offset1, offset2);
  const [y, cycleY] = useCycle(offset1, offset2);

  switch (type) {
    case 'rotate':
      return (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 2,
            repeatDelay: 0
          }}
        >
          {children}
        </motion.div>
      );
    case 'slide':
      if (direction === 'up' || direction === 'down') {
        return (
          <motion.div animate={{ y: y !== undefined ? y : '' }} onHoverEnd={() => cycleY()} onHoverStart={() => cycleY()}>
            {children}
          </motion.div>
        );
      }
      return (
        <motion.div animate={{ x: x !== undefined ? x : '' }} onHoverEnd={() => cycleX()} onHoverStart={() => cycleX()}>
          {children}
        </motion.div>
      );

    case 'scale':
    default:
      if (typeof scale === 'number') {
        scale = {
          hover: scale,
          tap: scale
        };
      }
      return (
        <motion.div whileHover={{ scale: scale?.hover }} whileTap={{ scale: scale?.tap }}>
          {children}
        </motion.div>
      );
  }
}

AnimateButton.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['slide', 'scale', 'rotate']),
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
  offset: PropTypes.number,
  scale: PropTypes.object
};
