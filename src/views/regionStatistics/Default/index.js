// material-ui
import { Grid } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import RegionalStatus from './regionalStatus';
import RegionTable from './regionTable';
import { gridSpacing } from 'store/constant';

// db data
import Dummy from 'db/data.json';

// ==============================|| SAMPLE PAGE ||============================== //

const RegionStatistics = () => (
	<MainCard>
		<Grid item xs={12}>
			<Grid container spacing={gridSpacing}>
				<Grid item xs={12} md={12}>
					<RegionalStatus Dummy={Dummy} />
				</Grid>
				<Grid item xs={12} md={12}>
					<RegionTable Dummy={Dummy} />
				</Grid>
			</Grid>
		</Grid>
	</MainCard>
);

export default RegionStatistics;
