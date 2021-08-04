import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import MuiAvatar from '@material-ui/core/Avatar';

// style constant
const useStyles = makeStyles((theme) => ({
    primaryBackground: {
        background: theme.palette.primary.main,
        color: theme.palette.background.paper
    },
    secondaryBackground: {
        background: theme.palette.secondary.main,
        color: theme.palette.background.paper
    },
    errorBackground: {
        background: theme.palette.error.main,
        color: theme.palette.background.paper
    },
    warningBackground: {
        background: theme.palette.warning.dark,
        color: theme.palette.background.paper
    },
    infoBackground: {
        background: theme.palette.info.main,
        color: theme.palette.background.paper
    },
    successBackground: {
        background: theme.palette.success.dark,
        color: theme.palette.background.paper
    },
    greyBackground: {
        background: theme.palette.grey[500],
        color: theme.palette.background.paper
    },
    primaryOutline: {
        background: theme.palette.background.paper,
        color: theme.palette.primary.main,
        border: `2px solid ${theme.palette.primary.main}`
    },
    secondaryOutline: {
        background: theme.palette.background.paper,
        color: theme.palette.secondary.main,
        border: `2px solid ${theme.palette.secondary.main}`
    },
    errorOutline: {
        background: theme.palette.background.paper,
        color: theme.palette.error.main,
        border: `2px solid ${theme.palette.error.main}`
    },
    warningOutline: {
        background: theme.palette.background.paper,
        color: theme.palette.warning.dark,
        border: `2px solid ${theme.palette.warning.dark}`
    },
    infoOutline: {
        background: theme.palette.background.paper,
        color: theme.palette.info.main,
        border: `2px solid ${theme.palette.info.main}`
    },
    successOutline: {
        background: theme.palette.background.paper,
        color: theme.palette.success.dark,
        border: `2px solid ${theme.palette.success.dark}`
    },
    greyOutline: {
        background: theme.palette.background.paper,
        color: theme.palette.grey[500],
        border: `2px solid ${theme.palette.grey[500]}`
    },
    badge: {
        width: theme.spacing(3.5),
        height: theme.spacing(3.5)
    },
    xs: {
        width: theme.spacing(4.25),
        height: theme.spacing(4.25)
    },
    sm: {
        width: theme.spacing(5),
        height: theme.spacing(5)
    },
    md: {
        width: theme.spacing(7),
        height: theme.spacing(7)
    },
    lg: {
        width: theme.spacing(9),
        height: theme.spacing(9)
    },
    xl: {
        width: theme.spacing(10.25),
        height: theme.spacing(10.25)
    }
}));

// ===========================|| AVATAR ||=========================== //

const Avatar = ({ className, color, outline, size, ...others }) => {
    const classes = useStyles();
    let avatarClass = [];

    const outlineColor = outline ? [classes[`${color}Outline`], ...avatarClass] : [classes[`${color}Background`], ...avatarClass];

    avatarClass = color ? outlineColor : avatarClass;
    avatarClass = size ? [classes[size], ...avatarClass] : avatarClass;
    if (className) {
        avatarClass = className ? [...avatarClass, className] : avatarClass;
    }

    return <MuiAvatar className={avatarClass.join(' ')} {...others} />;
};

Avatar.propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
    outline: PropTypes.bool,
    size: PropTypes.string
};

export default Avatar;
