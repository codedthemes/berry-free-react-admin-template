import { lazy } from 'react';

// project imports
import GuestGuard from '../utils/route-guard/GuestGuard';
import MinimalLayout from '../layout/MinimalLayout';
import NavMotion from '../layout/NavMotion';
import Loadable from '../ui-component/Loadable';

// login routing
const AuthLogin = Loadable(lazy(() => import('../views/pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('../views/pages/authentication/Register')));
const AuthForgotPassword = Loadable(lazy(() => import('../views/pages/authentication/ForgotPassword')));
const AuthResetPassword = Loadable(lazy(() => import('../views/pages/authentication/ResetPassword')));
const AuthCheckMail = Loadable(lazy(() => import('../views/pages/authentication/CheckMail')));
const AuthCodeVerification = Loadable(lazy(() => import('../views/pages/authentication/CodeVerification')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: (
    <NavMotion>
      <GuestGuard>
        <MinimalLayout />
      </GuestGuard>
    </NavMotion>
  ),
  children: [
    {
      path: '/',
      element: <AuthLogin />
    },
    {
      path: '/login',
      element: <AuthLogin />
    },
    {
      path: '/register',
      element: <AuthRegister />
    },
    {
      path: '/forgot-password',
      element: <AuthForgotPassword />
    },
    {
      path: '/reset-password',
      element: <AuthResetPassword />
    },
    {
      path: '/check-mail',
      element: <AuthCheckMail />
    },
    {
      path: '/code-verification',
      element: <AuthCodeVerification />
    }
  ]
};

export default LoginRoutes;
