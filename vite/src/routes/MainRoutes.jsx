import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// finance routing
const FinanceOverview = Loadable(lazy(() => import('views/finance/Overview')));
const FinanceUpload = Loadable(lazy(() => import('views/finance/Upload')));
const FinanceTransactions = Loadable(lazy(() => import('views/finance/Transactions')));
const FinanceStatements = Loadable(lazy(() => import('views/finance/Statements')));
const FinanceSettings = Loadable(lazy(() => import('views/finance/Settings')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    { path: '/', element: <Navigate to="/finance/overview" replace /> },
    { path: 'dashboard/default', element: <Navigate to="/finance/overview" replace /> },
    {
      path: 'finance',
      children: [
        { index: true, element: <Navigate to="/finance/overview" replace /> },
        { path: 'overview', element: <FinanceOverview /> },
        { path: 'upload', element: <FinanceUpload /> },
        { path: 'transactions', element: <FinanceTransactions /> },
        { path: 'statements', element: <FinanceStatements /> },
        { path: 'settings', element: <FinanceSettings /> }
      ]
    }
  ]
};

export default MainRoutes;
