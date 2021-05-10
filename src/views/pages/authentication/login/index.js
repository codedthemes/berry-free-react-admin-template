import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Box, Card, CardContent, Divider, Grid, Hidden, makeStyles, Typography, useMediaQuery, useTheme} from '@material-ui/core';

import Carousel from 'react-material-ui-carousel';

//import JWTLogin from './JWTLogin';
//import Auth0Login from './Auth0Login';
import FirebaseLogin from './FirebaseLogin';

import logo from './../../../../assets/images/logo.svg';
import AuthPattern from './../../../../assets/images/auth/auth-pattern.svg';
import AuthBlue from './../../../../assets/images/auth/auth-blue.svg';
import AuthPurple from './../../../../assets/images/auth/auth-purple.svg';
import AuthBlueCard from './../../../../assets/images/auth/auth-blue-card.svg';
import AuthPurpleCard from './../../../../assets/images/auth/auth-purple-card.svg';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.light,
        height: '100%',
        minHeight: '100vh',
        width: '100%'
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
            left: '435px',
            top: '529px',
            backgroundImage: `url(${AuthBlue})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            animation: '15s blink ease-in-out infinite',
            [theme.breakpoints.down('lg')]: {
                top: '465px',
                left: '325px'
            }
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '225px',
            height: '130px',
            top: '76px',
            left: '103px',
            backgroundImage: `url(${AuthPurple})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            animation: '15s blink ease-in-out infinite',
            animationDelay: '1s',
            [theme.breakpoints.down('lg')]: {
                top: '140px',
                left: '-10px'
            }
        }
    },
    authPurpleCard: {
        '&:after': {
            content: '""',
            position: 'absolute',
            top: '32%',
            left: '40%',
            width: '313px',
            backgroundSize: '380px',
            height: '280px',
            backgroundImage: `url(${AuthPurpleCard})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            animation: '15s wings ease-in-out infinite'
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            top: '23%',
            left: '37%',
            width: '243px',
            height: '210px',
            backgroundSize: '380px',
            backgroundImage: `url(${AuthBlueCard})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            animation: '15s wings ease-in-out infinite',
            animationDelay: '1s'
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

const Login = () => {
    const classes = useStyles();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    const items = [
        {
            title: 'Components Based Design System',
            description: 'Powerfull and easy to use multipurpose theme'
        },
        {
            title: 'Components Based Design System',
            description: 'Powerfull and easy to use multipurpose theme'
        },
        {
            title: 'Components Based Design System',
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
                                                        Hi, Welcome Back
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography color="textPrimary" gutterBottom variant={matchDownSM ? 'h4' : 'h3'}>
                                                        Login in to your account
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            {/* <Grid item>
                                                <Typography variant="caption">
                                                    Enter your credentials to continue.
                                                </Typography>
                                            </Grid> */}
                                        </Grid>
                                    </Grid>
                                    <Grid item className={classes.icon}>
                                        <RouterLink to="#">
                                            <img alt="Auth method" src={logo} width="100" />
                                        </RouterLink>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                {/* <JWTLogin /> */}
                                {/* <Auth0Login /> */}
                                <FirebaseLogin />
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid item container direction="column" alignItems="flex-end" xs={12}>
                                    <Typography component={RouterLink} to="#" variant="subtitle1" className={classes.title}>
                                        Don't have an account?
                                    </Typography>
                                    {/* <Box mt={1} width='100%'>
                                    <Button
                                        disableElevation
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="outlined"
                                        className={classes.login}
                                    >
                                        Sign up now
                                    </Button>
                                </Box> */}
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Hidden mdDown>
                <Grid item md={5} sx={{alignSelf: 'stretch'}}>
                    <Box
                        component="span"
                        sx={{
                            display: 'flex',
                            maxWidth: 770,
                            minHeight: '100%',
                            height: '100vh',
                            bgcolor: '#fff',
                            backgroundImage: `url(${AuthPattern})`,
                            position: 'relative',
                            backgroundPosition: '0 0',
                            overflow: 'hidden',
                            margin: '0 0 0 auto'
                        }}
                    >
                        <Grid item container direction="column" justifyContent="flex-end">
                            <Grid item>
                                <span className={classes.authBlue}></span>
                                <span className={classes.authPurpleCard}></span>
                            </Grid>
                            <Grid item>
                                <Box p={10}>
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

export default Login;
