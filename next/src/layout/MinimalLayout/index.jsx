import PropTypes from 'prop-types';

// project imports
import Customization from '../Customization';

// ==============================|| MINIMAL LAYOUT ||============================== //

export default function MinimalLayout({ children }) {
  return (
    <>
      {children}
      <Customization />
    </>
  );
}

MinimalLayout.propTypes = { children: PropTypes.node };
