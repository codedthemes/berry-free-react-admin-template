import React from 'react';

// material-ui
import { makeStyles, useTheme } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import chartData from './chart-data/bajaj-area-chart';

// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: theme.palette.secondary.light
    },
    content: {
        padding: '0px !important'
    },
    contentContainer: {
        padding: '16px',
        paddingBottom: 0,
        color: '#fff'
    },
    fontStyle: {
        fontWeight: 400
    }
}));

//= ==========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||===========================//

const BajajAreaChartCard = () => {
    const classes = useStyles();
    const theme = useTheme();

    const orangeDark = theme.palette.secondary[800];

    React.useEffect(() => {
        const newSupportChart = {
            ...chartData.options,
            colors: [orangeDark],
            tooltip: {
                theme: 'light'
            }
        };
        ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
    }, [orangeDark]);

    return (
        <Card className={classes.card}>
            <CardContent className={classes.content}>
                <Grid container className={classes.contentContainer}>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.dark }}>
                                    Bajaj Finery
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h4" sx={{ color: theme.palette.grey[800] }}>
                                    $1839.00
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" sx={{ color: theme.palette.grey[800] }}>
                            10% Profit
                        </Typography>
                    </Grid>
                </Grid>
                <Chart {...chartData} />
            </CardContent>
        </Card>
    );
};

export default BajajAreaChartCard;
