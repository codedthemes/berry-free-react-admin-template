import PropTypes from 'prop-types';

// project imports
import DashboardLayout from 'layout/MainLayout';

// ==============================|| DASHBOARD LAYOUT ||============================== //

export default function Layout({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

Layout.propTypes = { children: PropTypes.node };
