import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

// material-ui
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import AuthWrapper1 from './AuthWrapper1';
import AuthCardWrapper from './AuthCardWrapper';
import ViewOnlyAlert from './ViewOnlyAlert';
import LoginProvider from './LoginProvider';

import Logo from '../ui-component/Logo';
import AuthFooter from '../ui-component/cards/AuthFooter';

import { APP_AUTH } from '../../config';
import useAuth from '../hooks/useAuth';

// Possible auth types
type AuthType = 'firebase' | 'jwt' | 'aws' | 'auth0' | 'supabase';

// A mapping of auth types to dynamic imports for reset password
const authResetPasswordImports: Record<AuthType, () => Promise<any>> = {
  firebase: () => import('./firebase/AuthResetPassword'),
  jwt: () => import('./jwt/AuthResetPassword'),
  aws: () => import('./aws/AuthResetPassword'),
  auth0: () => import('./auth0/AuthResetPassword'),
  supabase: () => import('./supabase/AuthResetPassword')
};

export default function ResetPassword() {
  const downMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [searchParams] = useSearchParams();
  const { isLoggedIn } = useAuth();
  const [AuthResetPasswordComponent, setAuthResetPasswordComponent] = useState<React.ComponentType | null>(null);

  const authParam = (searchParams.get('auth') as AuthType | null) || '';

  useEffect(() => {
    const selectedAuth = authParam || (APP_AUTH as AuthType);

    const importAuthResetPasswordComponent = authResetPasswordImports[selectedAuth];

    importAuthResetPasswordComponent()
      .then((module) => setAuthResetPasswordComponent(() => module.default))
      .catch((error) => {
        console.error(`Error loading ${selectedAuth} AuthResetPassword`, error);
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
                    <Grid container direction={{ xs: 'column-reverse', md: 'row' }} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                      <Grid>
                        <Stack spacing={1} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                          <Typography gutterBottom variant={downMD ? 'h3' : 'h2'} sx={{ color: 'secondary.main' }}>
                            Reset Password
                          </Typography>
                          <Typography variant="caption" sx={{ fontSize: '16px', textAlign: { xs: 'center', md: 'inherit' } }}>
                            Please choose your new password
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid size={12}>{AuthResetPasswordComponent && <AuthResetPasswordComponent />}</Grid>
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
