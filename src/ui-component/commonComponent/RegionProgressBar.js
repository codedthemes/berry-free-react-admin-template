import React, { useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function RegionProgressWithLabel(props) {
	return (
		<Box>
			<Box>
				<LinearProgress variant='determinate' {...props} />
			</Box>
		</Box>
	);
}

const RegionProgressBar = (props) => {
	const [progress, setProgress] = React.useState(0);
	useEffect(() => {
		const percent = (props.data / props.totalData) * 100;
		setProgress(percent >= 100 ? 100 : percent);
	}, [props.data, props.totalData]);

	return (
		<Box sx={{ width: '100%' }}>
			{/* 방문자인원수 */}
			<Typography fontWeight={'bold'}>{props.thisValue}</Typography>
			<RegionProgressWithLabel value={progress} />
			<Typography fontSize={13} sx={{ textAlign: 'right' }}>
				{props.total}
			</Typography>
		</Box>
	);
};

export default RegionProgressBar;
