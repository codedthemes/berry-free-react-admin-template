import React from 'react';
import clsx from 'clsx';
import {AppBar, CssBaseline, makeStyles, Toolbar, useMediaQuery, useTheme} from '@material-ui/core';

import {drawerWidth} from '../../store/constant';
import Header from './Header';
import Sidebar from './Sidebar';

import Breadcrumb from './../../ui-component/extended/Breadcrumb';
import navigation from './../../menu-items/main-menu-items';

import {IconChevronRight} from '@tabler/icons';
import {useDispatch, useSelector} from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        backgroundColor: theme.palette.background.default
    },
    appBarWidth: {
        transition: theme.transitions.create('width'),
        backgroundColor: theme.palette.background.default
    },
    content: {
        ...theme.typography.mainContent,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: -(drawerWidth - 20),
            width: `calc(100% - ${drawerWidth}px)`
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
            marginRight: '10px'
        }
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px'
        }
    }
}));

const MainLayout = ({children, showBreadcrumb = true}) => {
    const classes = useStyles();
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

    // Handle left drawer
    const leftDrawerOpened = useSelector((state) => state.customization.opened);
    const dispatch = useDispatch();
    const handleLeftDrawerToggle = () => {
        dispatch({type: 'SET_MENU', opened: !leftDrawerOpened});
    };

    React.useEffect(() => {
        const openLeftDrawerState = (val) => {
            dispatch({type: 'SET_MENU', opened: val});
        };
        openLeftDrawerState(matchUpMd);
    }, [dispatch, matchUpMd]);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" color="inherit" elevation={0} className={leftDrawerOpened ? classes.appBarWidth : classes.appBar}>
                <Toolbar>
                    <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
                </Toolbar>
            </AppBar>
            <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />
            <main
                className={clsx([
                    classes.content,
                    {
                        [classes.contentShift]: leftDrawerOpened
                    }
                ])}
            >
                {showBreadcrumb && <Breadcrumb separator={IconChevronRight} navigation={navigation} icon title rightAlign />}
                <div>{children}</div>
            </main>
        </div>
    );
};

export default MainLayout;
