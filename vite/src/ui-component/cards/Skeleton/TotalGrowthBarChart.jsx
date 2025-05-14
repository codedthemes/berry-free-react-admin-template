// material-ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

// project imports
import { gridSpacing } from 'store/constant';

// ==============================|| SKELETON TOTAL GROWTH BAR CHART ||============================== //

export default function TotalGrowthBarChart() {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={gridSpacing}>
          <Grid size={12}>
            <Grid container spacing={gridSpacing} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Grid size="grow">
                <Grid container spacing={1}>
                  <Grid size={12}>
                    <Skeleton variant="text" />
                  </Grid>
                  <Grid size={12}>
                    <Skeleton variant="rectangular" height={20} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid>
                <Skeleton variant="rectangular" height={50} width={80} />
              </Grid>
            </Grid>
          </Grid>
          <Grid size={12}>
            <Skeleton variant="rectangular" height={530} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
