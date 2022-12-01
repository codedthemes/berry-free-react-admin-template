import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import { gridSpacing } from 'store/constant';

// chart data
import DailyCardChartData from './chart-data/DailyCardChartData';

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const DailyCardChart = ({ isLoading }) => {
	const theme = useTheme();
	const customization = useSelector((state) => state.customization);

	const { navType } = customization;
	const { primary } = theme.palette.text;
	const darkLight = theme.palette.dark.light;
	const grey200 = theme.palette.grey[200];
	const grey500 = theme.palette.grey[500];

	const primary200 = theme.palette.primary[200];
	const primaryDark = theme.palette.primary.dark;
	const secondaryMain = theme.palette.secondary.main;
	const secondaryLight = theme.palette.secondary.light;

	useEffect(() => {
		const newChartData = {
			...DailyCardChartData.options,
			colors: [primary200, primaryDark, secondaryMain, secondaryLight],
			xaxis: {
				labels: {
					style: {
						colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
					}
				}
			},
			yaxis: {
				labels: {
					style: {
						colors: [primary]
					}
				}
			},
			grid: {
				borderColor: grey200
			},
			tooltip: {
				theme: 'light'
			},
			legend: {
				labels: {
					colors: grey500
				}
			}
		};

		// do not load chart when loading
		if (!isLoading) {
			ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
		}
	}, [navType, primary200, primaryDark, secondaryMain, secondaryLight, primary, darkLight, grey200, isLoading, grey500]);

	return (
		<>
			<Grid container spacing={gridSpacing}>
				<Grid item xs={12}>
					<Chart {...DailyCardChartData} />
				</Grid>
			</Grid>
		</>
	);
};

DailyCardChart.propTypes = {
	isLoading: PropTypes.bool
};

export default DailyCardChart;
