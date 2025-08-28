import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

// material-ui
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
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
import AnimateButton from '../ui-component/extended/AnimateButton';
import AuthFooter from '../ui-component/cards/AuthFooter';

import useAuth from '../hooks/useAuth';
import { APP_AUTH } from '../../config';

// Possible auth types
type AuthType = 'firebase' | 'jwt' | 'aws' | 'auth0' | 'supabase';

// A mapping of auth types to dynamic imports
const authCodeVerificationImports: Record<AuthType, () => Promise<any>> = {
  firebase: () => import('./firebase/AuthCodeVerification'),
  jwt: () => import('./jwt/AuthCodeVerification'),
  aws: () => import('./aws/AuthCodeVerification'),
  auth0: () => import('./auth0/AuthCodeVerification'),
  supabase: () => import('./supabase/AuthCodeVerification')
};

// ===========================|| AUTH3 - CODE VERIFICATION ||=========================== //

export default function CodeVerification() {
  const downMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [AuthCodeVerificationComponent, setAuthCodeVerificationComponent] = useState<React.ComponentType | null>(null);
  const { isLoggedIn } = useAuth();

  const [searchParams] = useSearchParams();
  const authParam = (searchParams.get('auth') as AuthType | null) || '';

  useEffect(() => {
    const selectedAuth = authParam || (APP_AUTH as AuthType);

    const importAuthCodeVerificationComponent = authCodeVerificationImports[selectedAuth];

    importAuthCodeVerificationComponent()
      .then((module) => setAuthCodeVerificationComponent(() => module.default))
      .catch((error) => {
        console.error(`Error loading ${selectedAuth} AuthCodeVerification`, error);
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
                    <Grid container direction={downMD ? 'column-reverse' : 'row'} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                      <Grid>
                        <Stack spacing={1} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                          <Typography gutterBottom variant={downMD ? 'h3' : 'h2'} sx={{ color: 'secondary.main' }}>
                            Enter Verification Code
                          </Typography>
                          <Typography variant="subtitle1" sx={{ fontSize: '1rem' }}>
                            We sent you an email.
                          </Typography>
                          <Typography variant="caption" sx={{ fontSize: '0.875rem', textAlign: downMD ? 'center' : 'inherit' }}>
                            We’ve sent you a code on jone.****@company.com
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid size={12}>{AuthCodeVerificationComponent && <AuthCodeVerificationComponent />}</Grid>
                  <Grid size={12}>
                    <Divider />
                  </Grid>
                  <Grid size={12}>
                    <Grid container direction="column" sx={{ alignItems: 'center' }} size={12}>
                      <Typography
                        component={Link}
                        to="#"
                        variant="subtitle1"
                        sx={{ textAlign: downMD ? 'center' : 'inherit', textDecoration: 'none' }}
                      >
                        Did not receive the email? Check your spam filter, or
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid size={12}>
                    <AnimateButton>
                      <Button disableElevation fullWidth size="large" type="submit" variant="outlined" color="secondary">
                        Resend Code
                      </Button>
                    </AnimateButton>
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
