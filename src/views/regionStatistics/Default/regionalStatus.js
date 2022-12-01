import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { Grid, Typography, Divider } from '@mui/material';
import Button from '@mui/material/Button';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import DatePicker from 'ui-component/commonComponent/DatePicker';

const RegionalStatus = (props) => {
	const [date, setDate] = useState();
	const [clickDate, setClickDate] = useState();
	var options = { year: 'numeric', month: 'long', day: 'numeric' };
	const onClick = () => {
		if (date === undefined) {
			alert('검색할 날짜를 선택해주세요.');
			return;
		}
		setClickDate(date.toLocaleDateString('ko-KR', options));
	};
	useEffect(() => {
		console.log('regionalStatus');
	}, []);

	return (
		<>
			<MainCard>
				<Grid>
					<Typography sx={{ fontSize: '1.6rem', mb: 1 }}>지역현황</Typography>
					<Divider sx={{ mb: 2 }} />
				</Grid>
				<Grid container spacing={gridSpacing}>
					<Grid item xs={12}>
						<Grid container direction='row' alignItems='center' justifyContent='space-between'>
							<Grid item xs={12} sm={12} md={12} lg={12}>
								<Typography sx={{ fontSize: 15 }}>날짜</Typography>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={12} md={4} lg={4}>
										<DatePicker setDate={setDate} />
									</Grid>
									<Grid item xs={12} sm={12} md={5} lg={5}>
										<Button onClick={onClick} variant='contained' disableElevation>
											적용하기
										</Button>
									</Grid>
									<Grid item xs={12} sm={12} md={3} lg={3}>
										{clickDate ? <Typography>적용날짜:{clickDate}</Typography> : ''}
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

RegionalStatus.propTypes = {
	isLoading: PropTypes.bool
};

export default RegionalStatus;
