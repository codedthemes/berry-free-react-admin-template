import React, {useState} from 'react';
import {
    Avatar,
    Box,
    ButtonBase,
    Card,
    CardContent,
    Fade,
    Grid,
    Hidden,
    InputAdornment,
    makeStyles,
    OutlinedInput,
    Popper
} from '@material-ui/core';
import PopupState, {bindPopper, bindToggle} from 'material-ui-popup-state';

import {IconAdjustmentsHorizontal, IconSearch, IconX} from '@tabler/icons';

const useStyles = makeStyles((theme) => ({
    searchControl: {
        width: '434px',
        marginLeft: '16px',
        paddingRight: '16px',
        paddingLeft: '16px',
        '& input': {
            background: 'transparent !important',
            paddingLeft: '5px !important'
        },
        [theme.breakpoints.down('lg')]: {
            width: '250px'
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginLeft: '4px',
            background: '#fff'
        }
    },
    startAdornment: {
        fontSize: '1rem',
        color: theme.palette.grey[500]
    },
    headerAvtar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        background: theme.palette.purple.light,
        color: theme.palette.purple.dark
    },
    colseAvtar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        background: theme.palette.orange.light,
        color: theme.palette.orange.dark
    },
    popperContainer: {
        zIndex: 1100,
        width: '99%',
        top: '-55px !important',
        padding: '0 12px',
        [theme.breakpoints.down('sm')]: {
            padding: '0 10px'
        }
    },
    cardContent: {
        padding: '12px !important'
    },
    card: {
        background: '#fff',
        [theme.breakpoints.down('sm')]: {
            border: 0,
            boxShadow: 'none'
        }
    }
}));

const SearchSection = () => {
    const classes = useStyles();
    const [value, setValue] = useState('');

    return (
        <React.Fragment>
            <Hidden mdUp>
                <PopupState variant="popper" popupId="demo-popup-popper">
                    {(popupState) => (
                        <React.Fragment>
                            <Box ml={2}>
                                <ButtonBase sx={{borderRadius: '12px'}}>
                                    <Avatar variant="rounded" className={classes.headerAvtar} {...bindToggle(popupState)}>
                                        <IconSearch stroke={1.5} size="1.2rem" />
                                    </Avatar>
                                </ButtonBase>
                            </Box>
                            <Popper {...bindPopper(popupState)} transition className={classes.popperContainer}>
                                {({TransitionProps}) => (
                                    <Fade {...TransitionProps} timeout={350}>
                                        <Card className={classes.card}>
                                            <CardContent className={classes.cardContent}>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item xs>
                                                        <OutlinedInput
                                                            className={classes.searchControl}
                                                            id="input-search-header"
                                                            value={value}
                                                            onChange={(e) => setValue(e.target.value)}
                                                            placeholder="Search"
                                                            startAdornment={
                                                                <InputAdornment position="start">
                                                                    <IconSearch
                                                                        stroke={1.5}
                                                                        size="1rem"
                                                                        className={classes.startAdornment}
                                                                    />
                                                                </InputAdornment>
                                                            }
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    <ButtonBase sx={{borderRadius: '12px'}}>
                                                                        <Avatar variant="rounded" className={classes.headerAvtar}>
                                                                            <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
                                                                        </Avatar>
                                                                    </ButtonBase>
                                                                    <Box ml={2}>
                                                                        <ButtonBase sx={{borderRadius: '12px'}}>
                                                                            <Avatar
                                                                                variant="rounded"
                                                                                className={classes.colseAvtar}
                                                                                {...bindToggle(popupState)}
                                                                            >
                                                                                <IconX stroke={1.5} size="1.3rem" />
                                                                            </Avatar>
                                                                        </ButtonBase>
                                                                    </Box>
                                                                </InputAdornment>
                                                            }
                                                            aria-describedby="search-helper-text"
                                                            inputProps={{
                                                                'aria-label': 'weight'
                                                            }}
                                                            labelWidth={0}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Fade>
                                )}
                            </Popper>
                        </React.Fragment>
                    )}
                </PopupState>
            </Hidden>
            <Hidden mdDown>
                <OutlinedInput
                    className={classes.searchControl}
                    id="input-search-header"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Search"
                    startAdornment={
                        <InputAdornment position="start">
                            <IconSearch stroke={1.5} size="1rem" className={classes.startAdornment} />
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            <ButtonBase sx={{borderRadius: '12px'}}>
                                <Avatar variant="rounded" className={classes.headerAvtar}>
                                    <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
                                </Avatar>
                            </ButtonBase>
                        </InputAdornment>
                    }
                    aria-describedby="search-helper-text"
                    inputProps={{
                        'aria-label': 'weight'
                    }}
                    labelWidth={0}
                />
            </Hidden>
        </React.Fragment>
    );
};

export default SearchSection;
