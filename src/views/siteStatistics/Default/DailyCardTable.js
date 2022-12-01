import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useEffect, Children } from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.white,
		color: theme.palette.common.black,
		borderWidth: 1,
		borderRightWidth: 1,
		borderColor: theme.palette.primary[200],
		borderStyle: 'solid',
		height: 5,
		fontSize: 13,
	},
	[`&.${tableCellClasses.body}`]: {
		borderWidth: 1,
		borderRightWidth: 1,
		borderColor: theme.palette.primary[200],
		borderStyle: 'solid',
		height: 20,
		fontSize: 11,
	},
}));
const DailyCardTable = (props) => {
	useEffect(() => {
		console.log('테이블');
	}, []);

	return (
		<>
			<PerfectScrollbar>
				<Table size='small' style={{ width: '11%' }}>
					<TableHead>
						<TableRow>
							<StyledTableCell align='center'></StyledTableCell>
							{Children.toArray(
								props.DayWeekDummy.map((dummy) => (
									<StyledTableCell align='center' colSpan={2}>
										{dummy.dayWeek}
									</StyledTableCell>
								)),
							)}
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<StyledTableCell>이번주</StyledTableCell>
							{Children.toArray(
								props.DayWeekDummy.map((dummy) => (
									<>
										<StyledTableCell>
											{dummy.thisWeekVisit
												.toString()
												.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
										</StyledTableCell>
										<StyledTableCell rowSpan={4}>
											{dummy.thisWeekVisit > dummy.lastWeekVisit ? (
												<ArrowDropUpIcon
													fontSize='medium'
													style={{ color: 'green' }}
												/>
											) : (
												<ArrowDropUpIcon
													fontSize='medium'
													style={{ color: 'grey' }}
												/>
											)}
											{dummy.thisWeekVisit > dummy.lastWeekVisit ? (
												<Typography
													align='center'
													fontSize={11}
													color={'green'}>
													{Math.round(
														Math.abs(
															((dummy.thisWeekVisit - dummy.lastWeekVisit) /
																dummy.lastWeekVisit) *
																100,
														),
													)}
													%
												</Typography>
											) : (
												<Typography align='center' fontSize={11} color={'red'}>
													{Math.round(
														Math.abs(
															((dummy.thisWeekVisit - dummy.lastWeekVisit) /
																dummy.lastWeekVisit) *
																100,
														),
													)}
													%
												</Typography>
											)}
											{dummy.thisWeekVisit < dummy.lastWeekVisit ? (
												<ArrowDropDownIcon
													fontSize='medium'
													style={{ color: 'red' }}
												/>
											) : (
												<ArrowDropDownIcon
													fontSize='medium'
													style={{ color: 'grey' }}
												/>
											)}
										</StyledTableCell>
									</>
								)),
							)}
						</TableRow>
						<TableRow>
							<StyledTableCell align='center'>지난주</StyledTableCell>
							{Children.toArray(
								props.DayWeekDummy.map((dummy) => (
									<StyledTableCell align='center'>
										{dummy.lastWeekVisit
											.toString()
											.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
									</StyledTableCell>
								)),
							)}
						</TableRow>
					</TableBody>
				</Table>
			</PerfectScrollbar>
		</>
	);
};

DailyCardTable.propTypes = {
	isLoading: PropTypes.bool,
};

export default DailyCardTable;
