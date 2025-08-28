import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

// material-ui
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import AuthWrapper1 from './AuthWrapper1';
import AuthCardWrapper from './AuthCardWrapper';
import ViewOnlyAlert from './ViewOnlyAlert';
import LoginProvider from './LoginProvider';

import Logo from '../ui-component/Logo';
import AuthFooter from '../ui-component/cards/AuthFooter';

import useAuth from '../hooks/useAuth';
import { APP_AUTH } from '../../config';

// Possible auth types
type AuthType = 'firebase' | 'jwt' | 'aws' | 'auth0' | 'supabase';

// A mapping of auth types to dynamic imports for AuthForgotPassword components
const authForgotPasswordImports: Record<AuthType, () => Promise<any>> = {
  firebase: () => import('./firebase/AuthForgotPassword'),
  jwt: () => import('./jwt/AuthForgotPassword'),
  aws: () => import('./aws/AuthForgotPassword'),
  auth0: () => import('./auth0/AuthForgotPassword'),
  supabase: () => import('./supabase/AuthForgotPassword')
};

export default function ForgotPassword() {
  const downMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const { isLoggedIn } = useAuth();
  const [AuthForgotPasswordComponent, setAuthForgotPasswordComponent] = useState<React.ComponentType | null>(null);

  const [searchParams] = useSearchParams();
  const authParam = (searchParams.get('auth') as AuthType | null) || '';

  useEffect(() => {
    const selectedAuth = authParam || (APP_AUTH as AuthType);

    const importAuthForgotPasswordComponent = authForgotPasswordImports[selectedAuth];

    importAuthForgotPasswordComponent()
      .then((module) => setAuthForgotPasswordComponent(() => module.default))
      .catch((error) => {
        console.error(`Error loading ${selectedAuth} AuthForgotPassword`, error);
      });
  }, [authParam]);

  return (
    <AuthWrapper1>
      <Grid container direction="column" sx={{ justifyContent: 'flex-end', minHeight: '100vh' }}>
        <Grid size={12}>
          <Grid container sx={{ justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 68px)' }}>
            <Grid sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              {!isLoggedIn && <ViewOnlyAlert />}
              <AuthCardWrapper>
                <Grid container spacing={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Grid sx={{ mb: 3 }}>
                    <Link to="#" aria-label="theme logo">
                      <Logo />
                    </Link>
                  </Grid>
                  <Grid size={12}>
                    <Grid container spacing={2} sx={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                      <Grid size={12}>
                        <Typography gutterBottom variant={downMD ? 'h3' : 'h2'} sx={{ color: 'secondary.main' }}>
                          Forgot password?
                        </Typography>
                      </Grid>
                      <Grid size={12}>
                        <Typography variant="caption" sx={{ fontSize: '16px', textAlign: 'center' }}>
                          Enter your email address below and we&apos;ll send you a password reset OTP.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid size={12}>{AuthForgotPasswordComponent && <AuthForgotPasswordComponent />}</Grid>
                  <Grid size={12}>
                    <Divider />
                  </Grid>
                  <Grid size={12}>
                    <Grid container direction="column" sx={{ alignItems: 'center' }} size={12}>
                      <Typography
                        component={Link}
                        to={isLoggedIn ? '/pages/login/login3' : authParam ? `/login?auth=${authParam}` : '/login'}
                        variant="subtitle1"
                        sx={{ textDecoration: 'none' }}
                      >
                        Already have an account?
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
              {!isLoggedIn && (
                <Box
                  sx={{
                    maxWidth: { xs: 400, lg: 475 },
                    margin: { xs: 2.5, md: 3 },
                    '& > *': {
                      flexGrow: 1,
                      flexBasis: '50%'
                    }
                  }}
                >
                  <LoginProvider currentLoginWith={APP_AUTH} />
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{ px: 3, my: 3 }} size={12}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
}
