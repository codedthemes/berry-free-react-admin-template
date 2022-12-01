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

const MonthlyCardChart = (props) => {
    const theme = useTheme();

    const data = {
        datasets: [
            {
                label: 'My First Dataset',
                data: [377006, 436675, 1074948],
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)']
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
                    <Card {...props}>
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

MonthlyCardChart.propTypes = {
    isLoading: PropTypes.bool
};

export default MonthlyCardChart;
