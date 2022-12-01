import PropTypes from 'prop-types';

// material-ui
import { Grid, Typography, Divider } from '@mui/material';
import PieChartSharpIcon from '@mui/icons-material/PieChartSharp';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import CircleChart from 'ui-component/commonComponent/CircleChart';

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const MonthlyCard = (props) => {
	const color = {
		firstColor: {
			color: 'rgb(255, 99, 132)'
		},
		secondColor: {
			color: 'rgb(54, 162, 235)'
		},
		thirdColor: {
			color: 'rgb(255, 205, 86)'
		}
	};
	return (
		<>
			<MainCard>
				<Grid>
					<Typography sx={{ fontSize: '1.6rem', mb: 1 }}>월별추세</Typography>
					<Divider sx={{ mb: 2 }} />
				</Grid>
				<Grid container spacing={gridSpacing}>
					<Grid item xs={12}>
						<Grid container direction='row' alignItems='center' justifyContent='center'>
							<Grid item xs={6} sm={4} md={5} lg={5}>
								<CircleChart
									firstData={props.visitSumResult}
									secondData={props.fortNightResult}
									thirdData={props.lastMonthVisitResult}
									color={color}
								/>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={7}>
								<Typography fontSize={17} fontWeight={'bold'} sx={{ pb: 1 }}>
									{props.oneMonthAgo.getMonth() + 1}월 {props.oneMonthAgo.getFullYear()}년 대비
									{props.today.getMonth() + 1}월 {props.today.getFullYear()}년
								</Typography>
								<Grid container>
									<Grid item xs={9}>
										<Typography fontSize={13} sx={{ pb: 1 }}>
											<PieChartSharpIcon fontSize='10' sx={{ color: color.firstColor, mr: 2 }} />
											이번달
										</Typography>
									</Grid>
									<Grid item xs={3}>
										<Typography fontSize={13}>
											{props.visitSumResult.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}명
										</Typography>
									</Grid>
								</Grid>
								<Grid container>
									<Grid item xs={9}>
										<Typography fontSize={12} sx={{ pb: 1 }}>
											<PieChartSharpIcon fontSize='10' sx={{ color: color.secondColor, mr: 2 }} />
											지난달 1일부터 {props.oneMonthAgo.getFullYear()}년 {props.oneMonthAgo.getMonth() + 1}월 14일까지
										</Typography>
									</Grid>
									<Grid item xs={3}>
										<Typography fontSize={13}>
											{props.fortNightResult.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}명
										</Typography>
									</Grid>
								</Grid>
								<Grid container>
									<Grid item xs={9}>
										<Typography fontSize={13} sx={{ pb: 1 }}>
											<PieChartSharpIcon fontSize='10' sx={{ color: color.thirdColor, mr: 2 }} />
											지난달 합계
										</Typography>
									</Grid>
									<Grid item xs={3}>
										<Typography fontSize={13}>
											{props.lastMonthVisitResult.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}명
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</MainCard>
		</>
	);
};

MonthlyCard.propTypes = {
	isLoading: PropTypes.bool
};

export default MonthlyCard;
