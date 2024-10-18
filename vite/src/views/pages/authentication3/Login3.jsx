import { Link } from 'react-router-dom';

// material-ui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../authentication/auth-forms/AuthLogin';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
    const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

    return (
        <AuthWrapper1>
            <Stack justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Stack justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                    <Box sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                        <AuthCardWrapper>
                            <Grid container spacing={2} alignItems="center" justifyContent="center">
                                <Grid sx={{ mb: 3 }}>
                                    <Link sx={{ mb: 3 }} to="#" aria-label="logo">
                                        <Logo />
                                    </Link>
                                </Grid>
                                <Grid size={12}>
                                    <Grid
                                        container
                                        direction={{ xs: 'column-reverse', md: 'row' }}
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Grid>
                                            <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                <Typography color="secondary.main" gutterBottom variant={downMD ? 'h3' : 'h2'}>
                                                    Hi, Welcome Back
                                                </Typography>
                                                <Typography variant="caption" fontSize="16px" textAlign={{ xs: 'center', md: 'inherit' }}>
                                                    Enter your credentials to continue
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid size={12}>
                                    <AuthLogin />
                                </Grid>
                                <Grid size={12}>
                                    <Divider />
                                </Grid>
                                <Grid size={12}>
                                    <Grid container direction="column" alignItems="center" size={12}>
                                        <Typography
                                            component={Link}
                                            to="/pages/register"
                                            variant="subtitle1"
                                            sx={{ textDecoration: 'none' }}
                                        >
                                            Don&apos;t have an account?
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </AuthCardWrapper>
                    </Box>
                </Stack>
                <Box sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Box>
            </Stack>
        </AuthWrapper1>
    );
};

export default Login;
