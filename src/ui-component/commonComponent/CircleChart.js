import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
import { Box, Card, CardContent, useTheme } from '@mui/material';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const CircleChart = (props) => {
    const theme = useTheme();
    console.log(props.color);
    const data = {
        datasets: [
            {
                label: 'My First Dataset',
                data: [props.firstData, props.secondData, props.thirdData],
                backgroundColor: [props.color.firstColor.color, props.color.secondColor.color, props.color.thirdColor.color]
            }
        ]
    };

    const options = {
        animation: false,
        cutoutPercentage: 80,
        layout: { padding: 0 },
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
            backgroundColor: theme.palette.background.paper,
            bodyFontColor: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            borderWidth: 1,
            enabled: true,
            footerFontColor: theme.palette.text.secondary,
            intersect: false,
            mode: 'index',
            titleFontColor: theme.palette.text.primary
        }
    };

    useEffect(() => {
        console.log('MonthlyCard');
    }, []);

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={9}>
                    <Card>
                        <CardContent>
                            <Box
                                sx={{
                                    height: 150,
                                    position: 'relative'
                                }}
                            >
                                <Doughnut data={data} options={options} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

CircleChart.propTypes = {
    isLoading: PropTypes.bool
};

export default CircleChart;
