import React from 'react';

import {
    Avatar,
    Box,
    Button,
    ButtonBase,
    Card,
    CardActions,
    CardContent,
    Chip,
    ClickAwayListener,
    Divider,
    Fade,
    Grid,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    Paper,
    Popper,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';

import {IconBell, IconBrandTelegram, IconBuildingStore, IconMailbox, IconPhoto} from '@tabler/icons';
import User1 from './../../../../assets/images/users/user-round.svg';

const useStyles = makeStyles((theme) => ({
    navContainer: {
        width: '100%',
        maxWidth: '330px',
        paddingTop: 0,
        paddingBottom: 0,
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '300px'
            //maxWidth: '100%'
        }
    },
    listAction: {
        top: '22px'
    },
    actionColor: {
        color: theme.palette.grey[500]
    },
    ScrollHeight: {
        height: '100%',
        maxHeight: 'calc(100vh - 205px)',
        overflowX: 'hidden'
    },
    listItem: {
        padding: 0
    },
    sendIcon: {
        marginLeft: '8px',
        marginTop: '-3px'
    },
    headerAvtar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        transition: 'all .2s ease-in-out',
        background: theme.palette.purple.light,
        color: theme.palette.purple.dark,
        '&[aria-controls="menu-list-grow"],&:hover': {
            background: theme.palette.purple.main,
            color: theme.palette.purple.light
        }
    },
    cardContent: {
        padding: '0px !important'
    },
    notificationChip: {
        color: '#fff',
        backgroundColor: theme.palette.warning.dark
    },
    divider: {
        marginTop: 0,
        marginBottom: 0
    },
    listDivider: {
        marginTop: 0,
        marginBottom: 0
    },
    listChipError: {
        color: theme.palette.orange.dark,
        backgroundColor: theme.palette.orange.light,
        height: '24px',
        padding: '0 6px',
        marginRight: '5px'
    },
    listChipWarning: {
        color: theme.palette.warning.dark,
        backgroundColor: theme.palette.warning.light,
        height: '24px',
        padding: '0 6px'
    },
    listChipSuccess: {
        color: theme.palette.success.dark,
        backgroundColor: theme.palette.success.light,
        height: '24px',
        padding: '0 6px'
    },
    listAvatarSuccess: {
        color: theme.palette.success.dark,
        backgroundColor: theme.palette.success.light,
        border: 'none',
        borderColor: theme.palette.success.main
    },
    listAvatarPrimary: {
        color: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.light,
        border: 'none',
        borderColor: theme.palette.primary.main
    },
    listContainer: {
        paddingLeft: '56px'
    },
    uploadCard: {
        backgroundColor: theme.palette.purple.light
    },
    cardAction: {
        padding: '10px',
        justifyContent: 'center'
    },
    paddingBottom: {
        paddingBottom: '16px'
    },
    box: {
        marginLeft: '16px',
        marginRight: '24px',
        [theme.breakpoints.down('sm')]: {
            marginRight: '16px'
        }
    },
    bodyspacing: {
        padding: '16px 16px 0'
    },
    textboxspacing: {
        padding: '0px 16px'
    },
    itemaction: {
        cursor: 'pointer',
        padding: '16px',
        '&:hover': {
            background: theme.palette.primary.light
        }
    }
    // notificationpoper: {
    //     [theme.breakpoints.down('sm')]: {
    //         maxWidth: '100% ',
    //         //transform: 'none !important',
    //         top: '100% !important',
    //         left: '0px',
    //         right: '0px'
    //     }
    // }
}));

const status = [
    {
        value: 'all',
        label: 'All Notification'
    },
    {
        value: 'new',
        label: 'New'
    },
    {
        value: 'unread',
        label: 'Unread'
    },
    {
        value: 'other',
        label: 'Other'
    }
];

const NotificationSection = () => {
    const classes = useStyles();
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('sm'));

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <React.Fragment>
            <Box component="span" className={classes.box}>
                <ButtonBase sx={{borderRadius: '12px'}}>
                    <Avatar
                        variant="rounded"
                        className={classes.headerAvtar}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        color="inherit"
                    >
                        <IconBell stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </Box>
            <Popper
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                className={classes.notificationpoper}
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? 5 : 0, 20]
                            }
                        }
                    ]
                }}
            >
                {({TransitionProps, placement}) => (
                    <Fade {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <Card elevation={16}>
                                    <CardContent className={classes.cardContent}>
                                        <Grid container direction="column" spacing={2}>
                                            <Grid item xs={12}>
                                                <div className={classes.bodyspacing}>
                                                    <Grid container alignItems="center" justifyContent="space-between">
                                                        <Grid item>
                                                            <Stack direction="row" spacing={2}>
                                                                <Typography variant="subtitle1">All Notification</Typography>
                                                                <Chip size="small" label="01" className={classes.notificationChip} />
                                                            </Stack>
                                                        </Grid>
                                                        <Grid item>
                                                            <Link href="#">
                                                                <Typography variant="subtitle2" color="primary">
                                                                    Mark as all read
                                                                </Typography>
                                                            </Link>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <PerfectScrollbar className={classes.ScrollHeight}>
                                                    <Grid container direction="column" spacing={2}>
                                                        <Grid item xs={12}>
                                                            <div className={classes.textboxspacing}>
                                                                <TextField
                                                                    id="outlined-select-currency-native"
                                                                    select
                                                                    fullWidth
                                                                    value={value}
                                                                    onChange={handleChange}
                                                                    SelectProps={{
                                                                        native: true
                                                                    }}
                                                                    variant="outlined"
                                                                >
                                                                    {status.map((option) => (
                                                                        <option key={option.value} value={option.value}>
                                                                            {option.label}
                                                                        </option>
                                                                    ))}
                                                                </TextField>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={12} p={0}>
                                                            <Divider className={classes.divider} />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <List className={classes.navContainer}>
                                                                <div className={classes.itemaction}>
                                                                    <ListItem alignItems="center" className={classes.listItem}>
                                                                        <ListItemAvatar>
                                                                            <Avatar alt="John Doe" src={User1} />
                                                                        </ListItemAvatar>
                                                                        <ListItemText
                                                                            primary={
                                                                                <Typography variant="subtitle1">Kishan Pandav</Typography>
                                                                            }
                                                                        />
                                                                        <ListItemSecondaryAction className={classes.listAction}>
                                                                            <Grid container justifyContent="flex-end">
                                                                                <Grid item xs={12}>
                                                                                    <Typography
                                                                                        variant="caption"
                                                                                        display="block"
                                                                                        gutterBottom
                                                                                        className={classes.actionColor}
                                                                                    >
                                                                                        2 min ago
                                                                                    </Typography>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </ListItemSecondaryAction>
                                                                    </ListItem>
                                                                    <Grid container direction="column" className={classes.listContainer}>
                                                                        <Grid item xs={12} className={classes.paddingBottom}>
                                                                            <Typography variant="subtitle2">
                                                                                It is a long established fact that a reader will be
                                                                                distracted
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item xs={12}>
                                                                            <Grid container>
                                                                                <Grid item>
                                                                                    <Chip
                                                                                        label="Unread"
                                                                                        className={classes.listChipError}
                                                                                    />
                                                                                </Grid>
                                                                                <Grid item>
                                                                                    <Chip label="New" className={classes.listChipWarning} />
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </div>
                                                                <Divider className={classes.listDivider} />
                                                                <div className={classes.itemaction}>
                                                                    <ListItem alignItems="center" className={classes.listItem}>
                                                                        <ListItemAvatar>
                                                                            <Avatar className={classes.listAvatarSuccess}>
                                                                                <IconBuildingStore stroke={1.5} size="1.3rem" />
                                                                            </Avatar>
                                                                        </ListItemAvatar>
                                                                        <ListItemText
                                                                            primary={
                                                                                <Typography variant="subtitle1">
                                                                                    Store Verification Done
                                                                                </Typography>
                                                                            }
                                                                        />
                                                                        <ListItemSecondaryAction className={classes.listAction}>
                                                                            <Grid container justifyContent="flex-end">
                                                                                <Grid item xs={12}>
                                                                                    <Typography
                                                                                        variant="caption"
                                                                                        display="block"
                                                                                        gutterBottom
                                                                                        className={classes.actionColor}
                                                                                    >
                                                                                        2 min ago
                                                                                    </Typography>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </ListItemSecondaryAction>
                                                                    </ListItem>
                                                                    <Grid container direction="column" className={classes.listContainer}>
                                                                        <Grid item xs={12} className={classes.paddingBottom}>
                                                                            <Typography variant="subtitle2">
                                                                                We have sucessfully recieved your request.
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item xs={12}>
                                                                            <Grid container>
                                                                                <Grid item>
                                                                                    <Chip
                                                                                        label="Unread"
                                                                                        className={classes.listChipError}
                                                                                    />
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </div>
                                                                <Divider className={classes.listDivider} />
                                                                <div className={classes.itemaction}>
                                                                    <ListItem alignItems="center" className={classes.listItem}>
                                                                        <ListItemAvatar>
                                                                            <Avatar className={classes.listAvatarPrimary}>
                                                                                <IconMailbox stroke={1.5} size="1.3rem" />
                                                                            </Avatar>
                                                                        </ListItemAvatar>
                                                                        <ListItemText
                                                                            primary={
                                                                                <Typography variant="subtitle1">
                                                                                    Check Your Mail.
                                                                                </Typography>
                                                                            }
                                                                        />
                                                                        <ListItemSecondaryAction className={classes.listAction}>
                                                                            <Grid container justifyContent="flex-end">
                                                                                <Grid item>
                                                                                    <Typography
                                                                                        variant="caption"
                                                                                        display="block"
                                                                                        gutterBottom
                                                                                        className={classes.actionColor}
                                                                                    >
                                                                                        2 min ago
                                                                                    </Typography>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </ListItemSecondaryAction>
                                                                    </ListItem>
                                                                    <Grid container direction="column" className={classes.listContainer}>
                                                                        <Grid item xs={12} className={classes.paddingBottom}>
                                                                            <Typography variant="subtitle2">
                                                                                All done! Now check your inbox as you're in for a sweet
                                                                                treat!
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item xs={12}>
                                                                            <Grid container>
                                                                                <Grid item>
                                                                                    <Button
                                                                                        variant="contained"
                                                                                        color="primary"
                                                                                        disableElevation
                                                                                    >
                                                                                        Mail
                                                                                        <IconBrandTelegram
                                                                                            stroke={1.5}
                                                                                            size="1.3rem"
                                                                                            className={classes.sendIcon}
                                                                                        />
                                                                                    </Button>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </div>
                                                                <Divider className={classes.listDivider} />
                                                                <div className={classes.itemaction}>
                                                                    <ListItem alignItems="center" className={classes.listItem}>
                                                                        <ListItemAvatar>
                                                                            <Avatar alt="Jone Doe" src={User1} />
                                                                        </ListItemAvatar>
                                                                        <ListItemText
                                                                            primary={<Typography variant="subtitle1">Jone Doe</Typography>}
                                                                        />
                                                                        <ListItemSecondaryAction className={classes.listAction}>
                                                                            <Grid container justifyContent="flex-end">
                                                                                <Grid item xs={12}>
                                                                                    <Typography
                                                                                        variant="caption"
                                                                                        display="block"
                                                                                        gutterBottom
                                                                                        className={classes.actionColor}
                                                                                    >
                                                                                        2 min ago
                                                                                    </Typography>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </ListItemSecondaryAction>
                                                                    </ListItem>
                                                                    <Grid container direction="column" className={classes.listContainer}>
                                                                        <Grid item xs={12} className={classes.paddingBottom}>
                                                                            <Typography component="span" variant="subtitle2">
                                                                                Uploaded two file on &nbsp;
                                                                                <Typography component="span" variant="h6">
                                                                                    21 Jan 2020
                                                                                </Typography>
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item xs={12}>
                                                                            <Grid container>
                                                                                <Grid item xs={12}>
                                                                                    <Card className={classes.uploadCard}>
                                                                                        <CardContent>
                                                                                            <Grid container direction="column">
                                                                                                <Grid item xs={12}>
                                                                                                    <Stack direction="row" spacing={2}>
                                                                                                        <IconPhoto
                                                                                                            stroke={1.5}
                                                                                                            size="1.3rem"
                                                                                                        />
                                                                                                        <Typography variant="subtitle1">
                                                                                                            demo.jpg
                                                                                                        </Typography>
                                                                                                    </Stack>
                                                                                                </Grid>
                                                                                            </Grid>
                                                                                        </CardContent>
                                                                                    </Card>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </div>
                                                                <Divider className={classes.listDivider} />
                                                                <div className={classes.itemaction}>
                                                                    <ListItem alignItems="center" className={classes.listItem}>
                                                                        <ListItemAvatar>
                                                                            <Avatar alt="Jone Doe" src={User1} />
                                                                        </ListItemAvatar>
                                                                        <ListItemText
                                                                            primary={<Typography variant="subtitle1">Jone Doe</Typography>}
                                                                        />
                                                                        <ListItemSecondaryAction className={classes.listAction}>
                                                                            <Grid container justifyContent="flex-end">
                                                                                <Grid item xs={12}>
                                                                                    <Typography
                                                                                        variant="caption"
                                                                                        display="block"
                                                                                        gutterBottom
                                                                                        className={classes.actionColor}
                                                                                    >
                                                                                        2 min ago
                                                                                    </Typography>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </ListItemSecondaryAction>
                                                                    </ListItem>
                                                                    <Grid container direction="column" className={classes.listContainer}>
                                                                        <Grid item xs={12} className={classes.paddingBottom}>
                                                                            <Typography variant="subtitle2">
                                                                                It is a long established fact that a reader will be
                                                                                distracted
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item xs={12}>
                                                                            <Grid container>
                                                                                <Grid item>
                                                                                    <Chip
                                                                                        label="Confirmation of Account."
                                                                                        className={classes.listChipSuccess}
                                                                                    />
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </div>
                                                            </List>
                                                        </Grid>
                                                    </Grid>
                                                </PerfectScrollbar>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <Divider />
                                    <CardActions className={classes.cardAction}>
                                        <Button size="small" color="primary" disableElevation>
                                            View All
                                        </Button>
                                    </CardActions>
                                </Card>
                            </ClickAwayListener>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </React.Fragment>
    );
};

export default NotificationSection;
