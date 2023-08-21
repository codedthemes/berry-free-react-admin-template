import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import HomePage from 'src/pages/HomePage';

// dashboard routing
const DashboardDefault = Loadable(
  lazy(() => import('views/dashboard/Default')),
);

// utilities routing
const UtilsTypography = Loadable(
  lazy(() => import('views/utilities/Typography')),
);
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(
  lazy(() => import('views/utilities/MaterialIcons')),
);
const UtilsTablerIcons = Loadable(
  lazy(() => import('views/utilities/TablerIcons')),
);

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <HomePage />,
  children: [],
};

export default MainRoutes;
