import React from 'react';
import {Card, CardContent, Grid, MenuItem, TextField, Typography, useTheme} from '@material-ui/core';
import Chart from 'react-apexcharts';
import barChart from './chart/bar-chart';
import {gridSpacing} from '../../../store/constant';

const status = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'month',
        label: 'This Month'
    },
    {
        value: 'year',
        label: 'This Year'
    }
];

const ChartCard = () => {
    const [value, setValue] = React.useState('today');
    const theme = useTheme();

    const primary = theme.palette.secondary.main;
    barChart.options.grid.borderColor = theme.palette.primary.light;
    barChart.options.yaxis.labels.style.colors = [theme.palette.secondary.main];
    barChart.options.xaxis.labels.style.colors = [primary, primary, primary, primary, primary, primary, primary];

    return (
        <Card>
            <CardContent>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Grid container direction="column" spacing={1}>
                                    <Grid item>
                                        <Typography variant="subtitle2">Total Growth</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h3">$2,324.00</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    variant="outlined"
                                >
                                    {status.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Chart {...barChart} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ChartCard;
