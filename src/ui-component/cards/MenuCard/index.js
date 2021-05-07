import React from 'react';
import {
    Avatar,
    Card,
    CardContent,
    Grid,
    LinearProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
    Typography,
    withStyles
} from '@material-ui/core';

import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';

const useStyles = makeStyles((theme) => ({
    card: {
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
        marginBottom: '22px',
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '157px',
            height: '157px',
            background: theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.primary[200],
            borderRadius: '50%',
            top: '-105px',
            right: '-96px'
        }
    },
    cardContent: {
        padding: '16px'
    },
    menuIcon: {
        fontSize: '1.5rem'
    },
    list: {
        padding: 0,
        margin: 0
    },
    listItem: {
        padding: 0
    },
    listAvatar: {
        marginTop: 0
    },
    listText: {
        marginTop: 0
    },
    listPrimary: {
        color: theme.palette.mode === 'dark' ? theme.palette.dark.light : theme.palette.primary[800]
    },
    listSecondary: {
        display: 'block'
    },
    menuAvtar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        color: theme.palette.primary.main,
        border: theme.palette.mode === 'dark' ? '1px solid' : 'none',
        borderColor: theme.palette.primary.main,
        background: theme.palette.mode === 'dark' ? theme.palette.dark.dark : '#fff',
        marginRight: '12px'
    },
    progressContainer: {
        marginTop: '12px'
    }
}));

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 30
    },
    colorPrimary: {
        backgroundColor: '#fff'
    },
    bar: {
        borderRadius: 30,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.light : theme.palette.primary.main
    }
}))(LinearProgress);

function LinearProgressWithLabel(props) {
    const classes = useStyles();

    return (
        <Grid container direction="column" spacing={1} className={classes.progressContainer}>
            <Grid item>
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h6" className={classes.listPrimary}>
                            Progress
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" color="inherit">{`${Math.round(props.value)}%`}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <BorderLinearProgress variant="determinate" {...props} />
            </Grid>
        </Grid>
    );
}

const MenuCard = () => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <List className={classes.list}>
                    <ListItem alignItems="flex-start" disableGutters className={classes.listItem}>
                        <ListItemAvatar className={classes.listAvatar}>
                            <Avatar variant="rounded" className={classes.menuAvtar}>
                                <TableChartOutlinedIcon fontSize="inherit" />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            className={classes.listText}
                            primary={
                                <Typography variant="subtitle1" className={classes.listPrimary}>
                                    {' '}
                                    Get Extra Space
                                </Typography>
                            }
                            secondary={
                                <Typography variant="caption" className={classes.listSecondary}>
                                    {' '}
                                    28/23 GB
                                </Typography>
                            }
                        />
                    </ListItem>
                </List>
                <LinearProgressWithLabel value={80} />
            </CardContent>
        </Card>
    );
};

export default MenuCard;
