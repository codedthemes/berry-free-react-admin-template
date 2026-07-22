import PropTypes from 'prop-types';

// ================================|| SIMPLE LAYOUT ||================================ //

export default function Layout({ children }) {
  return <>{children}</>;
}

Layout.propTypes = { children: PropTypes.node };
