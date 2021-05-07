import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Box, Card, CardContent, Divider, Grid, Hidden, makeStyles, Typography, useMediaQuery, useTheme} from '@material-ui/core';

import Carousel from 'react-material-ui-carousel';

import FirebaseRgister from './../firebase-forms/FirebaseRgister';

import logo from './../../../../assets/images/logo.svg';
import logoDark from './../../../../assets/images/logo-dark.svg';
import AuthPattern from './../../../../assets/images/auth/auth-pattern.svg';
import AuthPatternDark from './../../../../assets/images/auth/auth-pattern-dark.svg';
import AuthBlue from './../../../../assets/images/auth/auth-blue.svg';
import AuthPurple from './../../../../assets/images/auth/auth-purple.svg';
import AuthBlueCard from './../../../../assets/images/auth/auth-signup-blue-card.svg';
import AuthWhiteCard from './../../../../assets/images/auth/auth-signup-white-card.svg';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary.light,
        height: '100%',
        minHeight: '100vh',
        width: '100%',
        maxWidth: 'calc(100% + 16px)'
    },
    card: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        maxWidth: '475px',
        overflow: 'visible',
        display: 'flex',
        position: 'relative',
        '& > *': {
            flexGrow: 1,
            flexBasis: '50%'
        },
        [theme.breakpoints.down('sm')]: {
            margin: '20px'
        },
        [theme.breakpoints.down('lg')]: {
            maxWidth: '400px'
        }
    },
    content: {
        padding: theme.spacing(5),
        [theme.breakpoints.down('lg')]: {
            padding: theme.spacing(3)
        }
    },
    icon: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: '24px'
        }
    },
    title: {
        color: theme.palette.grey[600],
        textDecoration: 'none'
    },
    login: {
        fontWeight: 500,
        color: theme.palette.purple.main,
        borderColor: theme.palette.purple.light,
        '&:hover': {
            borderColor: theme.palette.primary.light,
            backgroundColor: theme.palette.primary.light
        }
    },
    indicator: {
        color: theme.palette.purple.light,
        '&:hover': {
            color: theme.palette.purple.main
        }
    },
    activeIndicator: {
        color: theme.palette.purple.main
    },
    authBlue: {
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '225px',
            height: '130px',
            left: '100px',
            bottom: '-12px',
            backgroundImage: `url(${AuthBlue})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            animation: '15s blink ease-in-out infinite',
            [theme.breakpoints.down('lg')]: {
                left: '100px',
                bottom: '-12px'
            }
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '225px',
            height: '130px',
            top: '335px',
            right: '-100px',
            backgroundImage: `url(${AuthPurple})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            animation: '15s blink ease-in-out infinite',
            animationDelay: '1s',
            [theme.breakpoints.down('lg')]: {
                top: '335px',
                right: '-148px'
            }
        }
    },
    authPurpleCard: {
        '&:after': {
            content: '""',
            position: 'absolute',
            top: '45%',
            left: '35%',
            width: '260px',
            backgroundSize: '380px',
            height: '290px',
            backgroundImage: `url(${AuthWhiteCard})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            animation: '15s wings ease-in-out infinite',
            [theme.breakpoints.down('lg')]: {
                left: '25%',
                top: '50%'
            }
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            top: '12%',
            left: '25%',
            width: '360px',
            height: '350px',
            backgroundSize: '460px',
            backgroundImage: `url(${AuthBlueCard})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            animation: '15s wings ease-in-out infinite',
            animationDelay: '1s',
            [theme.breakpoints.down('lg')]: {
                top: '10%',
                left: '15%'
            }
        }
    }
}));

const Item = (props) => {
    return (
        <Grid container direction="column" alignItems="center" spacing={3} textAlign="center">
            <Grid item md={4} width={350}>
                <Typography variant="h1">{props.item.title}</Typography>
            </Grid>
            <Grid item md={2} width={200}>
                <Typography variant="subtitle2">{props.item.description}</Typography>
            </Grid>
        </Grid>
    );
};

const Register = () => {
    const classes = useStyles();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    const items = [
        {
            title: 'Power of React with Material UI',
            description: 'Powerfull and easy to use multipurpose theme'
        },
        {
            title: 'Power of React with Material UI',
            description: 'Powerfull and easy to use multipurpose theme'
        },
        {
            title: 'Power of React with Material UI',
            description: 'Powerfull and easy to use multipurpose theme'
        }
    ];

    return (
        <Grid container justifyContent="space-between" alignItems="center" className={classes.root}>
            <Grid item container justifyContent="center" md={7}>
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        <Grid container direction="column" spacing={2} justifyContent="center">
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    direction={matchDownSM ? 'column-reverse' : 'row'}
                                    alignItems={matchDownSM && 'center'}
                                    justifyContent={matchDownSM ? 'center' : 'space-between'}
                                >
                                    <Grid item>
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item container direction="column" alignItems={matchDownSM && 'center'}>
                                                <Grid item>
                                                    <Typography
                                                        color={theme.palette.purple.main}
                                                        gutterBottom
                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                    >
                                                        Sign up
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography color="textPrimary" gutterBottom variant="h4">
                                                        Enter credentials to continue
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item className={classes.icon}>
                                        <RouterLink to="#">
                                            <img alt="Auth method" src={theme.palette.mode === 'dark' ? logoDark : logo} width="100" />
                                        </RouterLink>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <FirebaseRgister />
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid item container direction="column" alignItems="flex-end" xs={12}>
                                    <Typography
                                        component={RouterLink}
                                        to="/pages/login/login1"
                                        variant="subtitle1"
                                        className={classes.title}
                                    >
                                        Having an account?
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Hidden mdDown>
                <Grid item md={5} sx={{position: 'relative', alignSelf: 'stretch'}}>
                    <Box
                        component="span"
                        sx={{
                            display: 'flex',
                            minHeight: '100vh',
                            bgcolor: theme.palette.mode === 'dark' ? theme.palette.dark.dark : '#fff',
                            backgroundImage: theme.palette.mode === 'dark' ? `url(${AuthPatternDark})` : `url(${AuthPattern})`,
                            position: 'absolute',
                            backgroundPosition: '0 0',
                            overflow: 'hidden',
                            m: '0 0 0 auto',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0
                        }}
                    >
                        <Grid item container direction="column" justifyContent="flex-end">
                            <Grid item>
                                <span className={classes.authBlue}></span>
                                <span className={classes.authPurpleCard}></span>
                            </Grid>
                            <Grid item>
                                <Box pb={10}>
                                    <Carousel
                                        animation="slide"
                                        navButtonsAlwaysInvisible
                                        autoPlay={false}
                                        indicatorIconButtonProps={{
                                            className: classes.indicator
                                        }}
                                        activeIndicatorIconButtonProps={{
                                            className: classes.activeIndicator
                                        }}
                                        indicatorContainerProps={{
                                            style: {
                                                marginTop: '32px'
                                            }
                                        }}
                                    >
                                        {items.map((item, i) => (
                                            <Item key={i} item={item} />
                                        ))}
                                    </Carousel>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Hidden>
        </Grid>
    );
};

export default Register;
