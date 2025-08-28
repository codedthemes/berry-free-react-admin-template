import { Link, useSearchParams } from 'react-router-dom';

// material-ui
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
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

// ==============================|| AUTH3 - CHECK MAIL ||============================== //

export default function CheckMail() {
  const downMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const { isLoggedIn } = useAuth();

  const [searchParams] = useSearchParams();
  const auth = searchParams.get('auth');

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
                          Hi, Check Your Mail
                        </Typography>
                      </Grid>
                      <Grid size={12}>
                        <Typography variant="caption" sx={{ fontSize: '16px', textAlign: { xs: 'center', md: 'inherit' } }}>
                          We have sent a password recover instructions to your email.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid size={12}>
                    <AnimateButton>
                      <Button
                        component={Link}
                        to={isLoggedIn ? '/pages/login/login3' : auth ? `/${auth}/login?auth=supabase` : '/login'}
                        disableElevation
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="secondary"
                      >
                        Open Mail
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
