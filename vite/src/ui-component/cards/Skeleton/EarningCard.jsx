// material-ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

// ==============================|| SKELETON - EARNING CARD ||============================== //

export default function EarningCard() {
  return (
    <Card>
      <CardContent>
        <Grid container direction="column">
          <Grid>
            <Grid container sx={{ justifyContent: 'space-between' }}>
              <Grid>
                <Skeleton variant="rectangular" width={44} height={44} />
              </Grid>
              <Grid>
                <Skeleton variant="rectangular" width={34} height={34} />
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <Skeleton variant="rectangular" sx={{ my: 2 }} height={40} />
          </Grid>
          <Grid>
            <Skeleton variant="rectangular" height={30} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
