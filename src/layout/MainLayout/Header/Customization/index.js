import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    Avatar,
    Drawer,
    Fab,
    FormControl,
    FormControlLabel,
    Grid,
    makeStyles,
    Radio,
    RadioGroup,
    Slider,
    Tooltip,
    Typography,
    useTheme
} from '@material-ui/core';

import SettingsSuggestIcon from '@material-ui/icons/SettingsSuggest';

import SubCard from '../../../../ui-component/cards/SubCard';
import {gridSpacing} from '../../../../store/constant';
import * as actionTypes from '../../../../store/actions';

function valuetext(value) {
    return `${value}px`;
}

const useStyles = makeStyles((theme) => ({
    menuIcon: {
        fontSize: '1.1rem'
    },
    headerAvtar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        transition: 'all .2s ease-in-out',
        background: theme.palette.primary.dark,
        color: theme.palette.background.paper,
        '&:hover': {
            background: theme.palette.primary.main,
            color: theme.palette.background.paper
        }
    },
    box: {
        marginLeft: '16px',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '8px'
        }
    }
}));

const Customization = () => {
    const classes = useStyles();
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const [borderRadius, setBorderRadius] = React.useState(customization.borderRadius);
    const handleBorderRadius = (event, newValue) => {
        setBorderRadius(newValue);
    };

    let initialFont;
    switch (customization.fontFamily) {
        case `'Inter', sans-serif`:
            initialFont = 'Inter';
            break;
        case `'Poppins', sans-serif`:
            initialFont = 'Poppins';
            break;
        case `'Roboto', sans-serif`:
        default:
            initialFont = 'Roboto';
            break;
    }

    const [fontFamily, setFontFamily] = React.useState(initialFont);

    const handleToggle = () => {
        setOpen(!open);
    };

    if (customization.rtlLayout) {
        document.querySelector('body').setAttribute('dir', 'rtl');
    }

    useEffect(() => {
        dispatch({type: actionTypes.SET_BORDER_RADIUS, borderRadius: borderRadius});
    }, [dispatch, borderRadius]);

    useEffect(() => {
        let newFont;
        switch (fontFamily) {
            case 'Inter':
                newFont = `'Inter', sans-serif`;
                break;
            case 'Poppins':
                newFont = `'Poppins', sans-serif`;
                break;
            case 'Roboto':
            default:
                newFont = `'Roboto', sans-serif`;
                break;
        }
        dispatch({type: actionTypes.SET_FONT_FAMILY, fontFamily: newFont});
    }, [dispatch, fontFamily]);

    return (
        <React.Fragment>
            <Tooltip title="Live Customize">
                <Fab
                    color="primary"
                    onClick={handleToggle}
                    size="medium"
                    variant="string"
                    sx={{
                        bottom: 0,
                        margin: (theme) => theme.spacing(4),
                        position: 'fixed',
                        right: 20,
                        zIndex: (theme) => theme.zIndex.speedDial,
                        bgcolor: 'transparent',
                        boxShadow: 'none',
                        ':hover': {
                            bgcolor: 'transparent',
                            boxShadow: 'none'
                        },
                        [theme.breakpoints.down('sm')]: {
                            display: 'none'
                        }
                    }}
                >
                    <Avatar
                        variant="rounded"
                        className={classes.headerAvtar}
                        onClick={handleToggle}
                        sx={{boxShadow: '0 3px 10px 0 rgb(33 150 243)', ':hover': {boxShadow: '0 6px 15px 0 rgb(33 150 243)'}}}
                    >
                        <SettingsSuggestIcon />
                    </Avatar>
                </Fab>
            </Tooltip>
            <Drawer
                anchor="right"
                onClose={handleToggle}
                open={open}
                PaperProps={{
                    sx: {
                        p: 3,
                        width: 280
                    }
                }}
            >
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <SubCard title="Font Family" darkTitle>
                            <FormControl>
                                <RadioGroup
                                    aria-label="font-family"
                                    value={fontFamily}
                                    onChange={(e) => setFontFamily(e.target.value)}
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel
                                        value="Roboto"
                                        control={<Radio />}
                                        label="Roboto"
                                        sx={{'& .MuiSvgIcon-root': {fontSize: 28}, '& .MuiFormControlLabel-label': {color: 'grey.900'}}}
                                    />
                                    <FormControlLabel
                                        value="Poppins"
                                        control={<Radio />}
                                        label="Poppins"
                                        sx={{'& .MuiSvgIcon-root': {fontSize: 28}, '& .MuiFormControlLabel-label': {color: 'grey.900'}}}
                                    />
                                    <FormControlLabel
                                        value="Inter"
                                        control={<Radio />}
                                        label="Inter"
                                        sx={{'& .MuiSvgIcon-root': {fontSize: 28}, '& .MuiFormControlLabel-label': {color: 'grey.900'}}}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12}>
                        <SubCard title="Border Radius" darkTitle>
                            <Grid item xs={12} container spacing={2} alignItems="center" sx={{mt: 2.5}}>
                                <Grid item>
                                    <Typography variant="h6" color="secondary">
                                        4px
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Slider
                                        value={borderRadius}
                                        onChange={handleBorderRadius}
                                        getAriaValueText={valuetext}
                                        valueLabelDisplay="on"
                                        aria-labelledby="discrete-slider-small-steps"
                                        marks
                                        step={2}
                                        min={4}
                                        max={24}
                                        color="secondary"
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6" color="secondary">
                                        24px
                                    </Typography>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid>
            </Drawer>
        </React.Fragment>
    );
};

export default Customization;
