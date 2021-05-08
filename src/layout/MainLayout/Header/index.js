import React from 'react';
import {Avatar, ButtonBase, Hidden, makeStyles} from '@material-ui/core';

import {IconMenu2} from '@tabler/icons';

import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';

import Customization from './Customization';

import MobileSection from './MobileSection';

import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1
    },
    headerAvtar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        transition: 'all .2s ease-in-out',
        background: theme.palette.primary.light,
        color: theme.palette.purple.dark,
        '&:hover': {
            background: theme.palette.purple.main,
            color: theme.palette.purple.light
        }
    },
    boxContainer: {
        width: '228px',
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            width: 'auto'
        }
    }
}));

const Header = (props) => {
    const {handleLeftDrawerToggle} = props;
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.boxContainer}>
                <Hidden mdDown>
                    <LogoSection />
                    <div className={classes.grow} />
                </Hidden>
                <ButtonBase sx={{borderRadius: '12px'}}>
                    <Avatar variant="rounded" className={classes.headerAvtar} onClick={handleLeftDrawerToggle}>
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </div>
            <SearchSection theme="light" />
            <div className={classes.grow} />
            <div className={classes.grow} />
            <Hidden smDown>
                <Customization />
            </Hidden>

            <NotificationSection />
            <ProfileSection />
            <Hidden smUp>
                <MobileSection />
            </Hidden>
        </React.Fragment>
    );
};

export default Header;
