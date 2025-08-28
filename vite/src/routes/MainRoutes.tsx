import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import AuthGuard from '../utils/route-guard/AuthGuard';
import { MenuOrientation } from 'config';

// sample page routing
const SamplePage = Loadable(lazy(() => import('../views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <AuthGuard>
      <MainLayout open={false} menuOrientation={MenuOrientation.VERTICAL} borderRadius={0} />
    </AuthGuard>
  ),
  children: [
    {
      path: '/sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
