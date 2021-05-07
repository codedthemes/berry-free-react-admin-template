import React from 'react';
import {Button, Card, CardContent, Grid, makeStyles, Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    card: {
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.warning.light,
        marginTop: '16px',
        marginBottom: '16px',
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '200px',
            height: '200px',
            border: '19px solid ',
            borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.warning.main,
            borderRadius: '50%',
            top: '65px',
            right: '-150px'
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '200px',
            height: '200px',
            border: '3px solid ',
            borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.warning.main,
            borderRadius: '50%',
            top: '145px',
            right: '-70px'
        }
    },
    tagLine: {
        color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : theme.palette.grey[900],
        opacity: theme.palette.mode === 'dark' ? 1 : 0.6
    },
    button: {
        color: theme.palette.grey[900],
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.warning.dark,
        textTransform: 'capitalize',
        '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark[800] : theme.palette.warning.main
        }
    }
}));

const UpgradePlanCard = () => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Typography variant="h4">Upgrade your plan</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle2" className={classes.tagLine}>
                            70% discount for 1 years <br />
                            subscriptions.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" className={classes.button} disableElevation>
                            Go Premium
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default UpgradePlanCard;
