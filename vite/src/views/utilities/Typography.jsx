// material-ui
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import MuiTypography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

// ==============================|| TYPOGRAPHY ||============================== //

export default function Typography() {
  return (
    <MainCard title="Basic Typography" secondary={<SecondaryAction link="https://next.material-ui.com/system/typography/" />}>
      <Grid container spacing={gridSpacing}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <SubCard title="Heading">
            <Stack sx={{ gap: 1 }}>
              <MuiTypography variant="h1" gutterBottom>
                h1. Heading
              </MuiTypography>
              <MuiTypography variant="h2" gutterBottom>
                h2. Heading
              </MuiTypography>
              <MuiTypography variant="h3" gutterBottom>
                h3. Heading
              </MuiTypography>
              <MuiTypography variant="h4" gutterBottom>
                h4. Heading
              </MuiTypography>
              <MuiTypography variant="h5" gutterBottom>
                h5. Heading
              </MuiTypography>
              <MuiTypography variant="h6" gutterBottom>
                h6. Heading
              </MuiTypography>
            </Stack>
          </SubCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <SubCard title="Sub title">
            <Stack sx={{ gap: 1 }}>
              <MuiTypography variant="subtitle1" gutterBottom>
                subtitle1. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur
              </MuiTypography>

              <MuiTypography variant="subtitle2" gutterBottom>
                subtitle2. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur
              </MuiTypography>
            </Stack>
          </SubCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <SubCard title="Body">
            <Stack sx={{ gap: 1 }}>
              <MuiTypography variant="body1" gutterBottom>
                body1. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur unde suscipit, quam beatae rerum
                inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
              </MuiTypography>

              <MuiTypography variant="body2" gutterBottom>
                body2. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur unde suscipit, quam beatae rerum
                inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
              </MuiTypography>
            </Stack>
          </SubCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <SubCard title="Extra">
            <Stack sx={{ gap: 1 }}>
              <MuiTypography variant="button" gutterBottom sx={{ display: 'block' }}>
                button text
              </MuiTypography>

              <MuiTypography variant="caption" gutterBottom sx={{ display: 'block' }}>
                caption text
              </MuiTypography>

              <MuiTypography variant="overline" gutterBottom sx={{ display: 'block' }}>
                overline text
              </MuiTypography>

              <MuiTypography
                variant="body2"
                component={Link}
                href="https://berrydashboard.com"
                target="_blank"
                underline="hover"
                gutterBottom
                sx={{ display: 'block', color: 'primary.main' }}
              >
                https://berrydashboard.com
              </MuiTypography>
            </Stack>
          </SubCard>
        </Grid>
      </Grid>
    </MainCard>
  );
}
