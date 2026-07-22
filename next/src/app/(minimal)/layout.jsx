import PropTypes from 'prop-types';

// project imports
import MinimalLayout from 'layout/MinimalLayout';

// ================================|| SIMPLE LAYOUT ||================================ //

export default function Layout({ children }) {
  return <MinimalLayout>{children}</MinimalLayout>;
}

Layout.propTypes = { children: PropTypes.node };
