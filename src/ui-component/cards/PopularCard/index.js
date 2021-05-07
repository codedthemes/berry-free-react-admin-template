import React from 'react';
import {Avatar, Button, Card, CardActions, CardContent, Divider, Grid, makeStyles, Menu, MenuItem, Typography} from '@material-ui/core';

import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';

import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';

import BajajCard from './BajajCard';
import {gridSpacing} from '../../../store/constant';

const useStyles = makeStyles((theme) => ({
    cardAction: {
        padding: '10px',
        paddingTop: 0,
        justifyContent: 'center'
    },
    primaryLight: {
        color: theme.palette.primary[200],
        cursor: 'pointer'
    },
    divider: {
        marginTop: '12px',
        marginBottom: '12px'
    },
    avatarSuccess: {
        width: '16px',
        height: '16px',
        borderRadius: '5px',
        backgroundColor: theme.palette.success.light,
        color: theme.palette.success.dark,
        marginLeft: '15px'
    },
    successDark: {
        color: theme.palette.success.dark
    },
    avatarError: {
        width: '16px',
        height: '16px',
        borderRadius: '5px',
        backgroundColor: theme.palette.orange.light,
        color: theme.palette.orange.dark,
        marginLeft: '15px'
    },
    errorDark: {
        color: theme.palette.orange.dark
    }
}));

const PopularCard = () => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card>
            <CardContent>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container alignContent="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h4">Popular Stocks</Typography>
                            </Grid>
                            <Grid item>
                                <MoreHorizOutlinedIcon
                                    fontSize="small"
                                    className={classes.primaryLight}
                                    aria-controls="menu-popular-card"
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                />
                                <Menu
                                    id="menu-popular-card"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    variant="selectedMenu"
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right'
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                    }}
                                >
                                    <MenuItem onClick={handleClose}> Today</MenuItem>
                                    <MenuItem onClick={handleClose}> This Month</MenuItem>
                                    <MenuItem onClick={handleClose}> This Year </MenuItem>
                                </Menu>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <BajajCard />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="subtitle1" color="inherit">
                                            Bajaj Finsery
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Typography variant="subtitle1" color="inherit">
                                                    $1839.00
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Avatar variant="rounded" className={classes.avatarSuccess}>
                                                    <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                                </Avatar>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2" className={classes.successDark}>
                                    10% Profit
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider className={classes.divider} />
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="subtitle1" color="inherit">
                                            TTML
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Typography variant="subtitle1" color="inherit">
                                                    $100.00
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Avatar variant="rounded" className={classes.avatarError}>
                                                    <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                                                </Avatar>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2" className={classes.errorDark}>
                                    10% loss
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider className={classes.divider} />
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="subtitle1" color="inherit">
                                            Reliance
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Typography variant="subtitle1" color="inherit">
                                                    $200.00
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Avatar variant="rounded" className={classes.avatarSuccess}>
                                                    <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                                </Avatar>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2" className={classes.successDark}>
                                    10% Profit
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider className={classes.divider} />
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="subtitle1" color="inherit">
                                            TTML
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Typography variant="subtitle1" color="inherit">
                                                    $189.00
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Avatar variant="rounded" className={classes.avatarError}>
                                                    <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                                                </Avatar>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2" className={classes.errorDark}>
                                    10% loss
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider className={classes.divider} />
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="subtitle1" color="inherit">
                                            Suzlon
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Typography variant="subtitle1" color="inherit">
                                                    $189.00
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Avatar variant="rounded" className={classes.avatarError}>
                                                    <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                                                </Avatar>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2" className={classes.errorDark}>
                                    10% loss
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions className={classes.cardAction}>
                <Button size="small" color="primary" disableElevation>
                    View All
                    <ChevronRightOutlinedIcon />
                </Button>
            </CardActions>
        </Card>
    );
};

export default PopularCard;
