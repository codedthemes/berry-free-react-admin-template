// material-ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

// project imports
import { gridSpacing } from 'store/constant';

// ==============================|| SKELETON - POPULAR CARD ||============================== //

export default function PopularCard() {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={gridSpacing}>
          <Grid size={12}>
            <Grid container spacing={gridSpacing} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Grid size="grow">
                <Skeleton variant="rectangular" height={20} />
              </Grid>
              <Grid>
                <Skeleton variant="rectangular" height={20} width={20} />
              </Grid>
            </Grid>
          </Grid>
          <Grid size={12}>
            <Skeleton variant="rectangular" height={150} />
          </Grid>
          <Grid size={12}>
            <Grid container spacing={1}>
              <Grid size={12}>
                <Grid container spacing={gridSpacing} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <Grid size={6}>
                    <Skeleton variant="rectangular" height={20} />
                  </Grid>
                  <Grid size={6}>
                    <Grid container spacing={gridSpacing} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                      <Grid size="grow">
                        <Skeleton variant="rectangular" height={20} />
                      </Grid>
                      <Grid>
                        <Skeleton variant="rectangular" height={16} width={16} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid size={6}>
                <Skeleton variant="rectangular" height={20} />
              </Grid>
            </Grid>
          </Grid>
          <Grid size={12}>
            <Grid container spacing={1}>
              <Grid size={12}>
                <Grid container spacing={gridSpacing} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <Grid size={6}>
                    <Skeleton variant="rectangular" height={20} />
                  </Grid>
                  <Grid size={6}>
                    <Grid container spacing={gridSpacing} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                      <Grid size="grow">
                        <Skeleton variant="rectangular" height={20} />
                      </Grid>
                      <Grid>
                        <Skeleton variant="rectangular" height={16} width={16} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid size={6}>
                <Skeleton variant="rectangular" height={20} />
              </Grid>
            </Grid>
          </Grid>
          <Grid size={12}>
            <Grid container spacing={1}>
              <Grid size={12}>
                <Grid container spacing={gridSpacing} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <Grid size={6}>
                    <Skeleton variant="rectangular" height={20} />
                  </Grid>
                  <Grid size={6}>
                    <Grid container spacing={gridSpacing} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                      <Grid size="grow">
                        <Skeleton variant="rectangular" height={20} />
                      </Grid>
                      <Grid>
                        <Skeleton variant="rectangular" height={16} width={16} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid size={6}>
                <Skeleton variant="rectangular" height={20} />
              </Grid>
            </Grid>
          </Grid>
          <Grid size={12}>
            <Grid container spacing={1}>
              <Grid size={12}>
                <Grid container spacing={gridSpacing} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <Grid size={6}>
                    <Skeleton variant="rectangular" height={20} />
                  </Grid>
                  <Grid size={6}>
                    <Grid container spacing={gridSpacing} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                      <Grid size="grow">
                        <Skeleton variant="rectangular" height={20} />
                      </Grid>
                      <Grid>
                        <Skeleton variant="rectangular" height={16} width={16} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid size={6}>
                <Skeleton variant="rectangular" height={20} />
              </Grid>
            </Grid>
          </Grid>
          <Grid size={12}>
            <Grid container spacing={1}>
              <Grid size={12}>
                <Grid container spacing={gridSpacing} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <Grid size={6}>
                    <Skeleton variant="rectangular" height={20} />
                  </Grid>
                  <Grid size={6}>
                    <Grid container spacing={gridSpacing} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                      <Grid size="grow">
                        <Skeleton variant="rectangular" height={20} />
                      </Grid>
                      <Grid>
                        <Skeleton variant="rectangular" height={16} width={16} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid size={6}>
                <Skeleton variant="rectangular" height={20} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <CardContent sx={{ p: 1.25, display: 'flex', pt: 0, justifyContent: 'center' }}>
        <Skeleton variant="rectangular" height={25} width={75} />
      </CardContent>
    </Card>
  );
}
