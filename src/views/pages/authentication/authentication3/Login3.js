import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Card, CardContent, Divider, Grid, Link, makeStyles, Typography, useMediaQuery, useTheme} from '@material-ui/core';

import FirebaseLogin from '../login/FirebaseLogin';

import logo from './../../../../assets/images/logo.svg';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.light,
        height: '100%',
        minHeight: '100vh',
        width: '100%',
        maxWidth: 'calc(100% + 16px)'
    },
    card: {
        margin: theme.spacing(0) + ' auto',
        maxWidth: '475px',
        overflow: 'visible',
        display: 'flex',
        position: 'relative',
        '& > *': {
            flexGrow: 1,
            flexBasis: '50%'
        },
        [theme.breakpoints.down('lg')]: {
            maxWidth: '400px'
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: '80%'
        }
    },
    content: {
        padding: theme.spacing(5),
        [theme.breakpoints.down('lg')]: {
            padding: theme.spacing(3)
        }
    },
    title: {
        color: theme.palette.grey[600],
        textDecoration: 'none'
    }
}));

const Login = () => {
    const classes = useStyles();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Grid container justifyContent={matchDownSM ? 'center' : 'space-between'} alignItems="center" className={classes.root}>
            <Grid item xs={12} sx={{minHeight: '100vh', height: '100%'}}>
                <Grid
                    sx={{minHeight: '100vh', height: '100%', p: matchDownSM ? 0 : '0 80px'}}
                    container
                    direction="column"
                    alignItems={matchDownSM ? 'center' : 'flex-start'}
                    spacing={matchDownSM ? 5 : 6}
                    justifyContent="space-between"
                >
                    <Grid item xs={12} sx={{mt: '40px', width: '100%', textAlign: 'center'}}>
                        <RouterLink to="#">
                            <img alt="Auth method" src={logo} width="100" />
                        </RouterLink>
                    </Grid>
                    <Grid item xs={12} container justifyContent="center" alignItems="center">
                        <Card className={classes.card}>
                            <CardContent className={classes.content}>
                                <Grid container direction="column" spacing={2} justifyContent="center">
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Grid container direction="column" alignItems="center" spacing={1}>
                                                    <Grid item container direction="column" alignItems="center">
                                                        <Grid item>
                                                            <Typography
                                                                color={theme.palette.purple.main}
                                                                gutterBottom
                                                                variant={matchDownSM ? 'h3' : 'h2'}
                                                            >
                                                                Hi, Welcome Back
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="caption" fontSize="16px">
                                                            {' '}
                                                            Enter your credentials to continue
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FirebaseLogin login={3} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item container direction="column" alignItems="center" xs={12}>
                                            <Typography
                                                component={RouterLink}
                                                to="/pages/register/register3"
                                                variant="subtitle1"
                                                className={classes.title}
                                            >
                                                Don't have an account?
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid
                        sx={{mb: '40px'}}
                        item
                        container
                        justifyContent={matchDownSM ? 'center' : 'space-between'}
                        direction={matchDownSM ? 'column' : 'row'}
                        alignItems="center"
                        spacing={matchDownSM ? 2 : 0}
                    >
                        <Grid item>
                            <Typography component={Link} href='https://berrydashboard.io' target='_blanks' variant="subtitle1" color={theme.palette.grey[600]}>
                                www.berrydashboard.io
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography component={Link} href='https://codedthemes.com' target='_blanks' variant="subtitle1" color={theme.palette.grey[600]}>
                                &copy; codedthemes.com
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Login;
