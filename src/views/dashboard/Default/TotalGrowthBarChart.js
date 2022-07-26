import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';


// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading, everydayCases }) => {
    const [chartData, setChartData] = useState({});

    const theme = useTheme();
    const customization = useSelector((state) => state.customization);

    const categories = everydayCases ? [everydayCases[0]?.date, everydayCases[1]?.date,everydayCases[2]?.date, everydayCases[3]?.date,everydayCases[4]?.date, everydayCases[5]?.date, everydayCases[6]?.date] : ['test'];
    const cases = everydayCases ? [everydayCases[0]?.cases, everydayCases[1]?.cases,everydayCases[2]?.cases, everydayCases[3]?.cases,everydayCases[4]?.cases, everydayCases[5]?.cases, everydayCases[6]?.cases] : ['test'];
    const deaths = everydayCases ? [everydayCases[0]?.death, everydayCases[1]?.death,everydayCases[2]?.death, everydayCases[3]?.death,everydayCases[4]?.death, everydayCases[5]?.death, everydayCases[6]?.death] : ['test'];
    const recovered = everydayCases ? [everydayCases[0]?.recovered, everydayCases[1]?.recovered,everydayCases[2]?.recovered, everydayCases[3]?.recovered,everydayCases[4]?.recovered, everydayCases[5]?.recovered, everydayCases[6]?.recovered] : ['test'];

    const chart = {
        height: 480,
        type: 'bar',
        options: {
            chart: {
                id: 'bar-chart',
                stacked: true,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }
            ],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '50%'
                }
            },
            xaxis: {
                type: 'category',
                categories: categories
            },
            legend: {
                show: true,
                fontSize: '14px',
                fontFamily: `'Roboto', sans-serif`,
                position: 'bottom',
                offsetX: 20,
                labels: {
                    useSeriesColors: false
                },
                markers: {
                    width: 16,
                    height: 16,
                    radius: 5
                },
                itemMargin: {
                    horizontal: 15,
                    vertical: 8
                }
            },
            fill: {
                type: 'solid'
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                show: true
            }
        },
        series: [
            {
                name: 'Cases',
                data: cases,
                color: '#f1c40f'
            },
            {
                name: 'Deaths',
                data: deaths,
                color: '#d63031'
            },
            {
                name: 'Recovered',
                data: recovered,
                color: '#2ecc71'
            }
        ],
    };

    useEffect(() => {
        setChartData(chart);
    }, [everydayCases]);

    return (
        <>
            {isLoading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="subtitle2">Biểu đồ chi tiết</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h3">Số liệu COVID-19 tại Việt Nam</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            {everydayCases && <Chart {...chartData} />}
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

TotalGrowthBarChart.propTypes = {
    isLoading: PropTypes.bool,
    everydayCases: PropTypes.array
};

export default TotalGrowthBarChart;
