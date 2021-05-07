import React from 'react';
import {Card, CardContent, Grid, makeStyles, Typography} from '@material-ui/core';
import Chart from 'react-apexcharts';
import supportChart from './support-chart';

const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: theme.palette.orange.main
    },
    content: {
        padding: '0px !important'
    },
    contentContainer: {
        padding: '16px',
        paddingBottom: 0,
        color: '#fff'
    },
    errorLight: {
        color: theme.palette.orange.light
    },
    fontStyle: {
        fontWeight: 400
    }
}));

const BajajCard = () => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent className={classes.content}>
                <Grid container className={classes.contentContainer}>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit" className={classes.fontStyle}>
                                    Bajaj Finsery
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    $1839.00
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" className={classes.errorLight}>
                            10% Profit
                        </Typography>
                    </Grid>
                </Grid>
                <Chart {...supportChart} />
            </CardContent>
        </Card>
    );
};

export default BajajCard;
