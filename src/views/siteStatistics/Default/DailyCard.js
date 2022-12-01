import PropTypes from 'prop-types';

// material-ui
import { Grid, Typography, Divider } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import DailyCardChart from './DailyCardChart';
import DailyCardTable from './DailyCardTable';

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const DailyCard = (props) => {
	return (
		<>
			<MainCard>
				<Grid>
					<Typography sx={{ fontSize: '1.6rem', mb: 1 }}>일별추세</Typography>
					<Divider sx={{ mb: 2 }} />
				</Grid>
				<Grid container spacing={gridSpacing}>
					<Grid item xs={12}>
						<Grid container direction='row' alignItems='center' justifyContent='space-between'>
							<Grid item xs={12} sm={12} md={12} lg={12}>
								<DailyCardChart />
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container direction='row' alignItems='center' justifyContent='space-between'>
							<Grid item xs={12} sm={12} md={12} lg={12}>
								<Typography textAlign={'center'} fontWeight={'bold'} fontSize={18} sx={{ mt: 1, mb: 1 }}>
									{props.lastWeek.getMonth() + 1}월{props.lastWeek.getDate()}일 ~{props.today.getMonth() + 1}월
									{props.today.getDate()}일
								</Typography>
								<DailyCardTable DayWeekDummy={props.DayWeekDummy} />
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</MainCard>
		</>
	);
};

DailyCard.propTypes = {
	isLoading: PropTypes.bool
};

export default DailyCard;
