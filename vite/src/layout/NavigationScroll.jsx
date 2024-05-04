import PropTypes from 'prop-types';
import { useEffect } from 'react';

// ==============================|| NAVIGATION SCROLL TO TOP ||============================== //

const NavigationScroll = ({ children }) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  return children || null;
};

NavigationScroll.propTypes = {
  children: PropTypes.node
};

export default NavigationScroll;
