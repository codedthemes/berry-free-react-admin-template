import { createBrowserRouter } from 'react-router-dom';

// routes
import AuthenticationRoutes from './AuthenticationRoutes';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([LoginRoutes, MainRoutes, AuthenticationRoutes], {
  basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
