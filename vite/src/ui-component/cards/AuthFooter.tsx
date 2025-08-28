// material-ui
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

export default function AuthFooter() {
  return (
    <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
      <Typography variant="subtitle2" component={Link} href="https://berrydashboard.com" target="_blank" underline="hover">
        berrydashboard.com
      </Typography>
      <Typography variant="subtitle2" component={Link} href="https://codedthemes.com" target="_blank" underline="hover">
        &copy; codedthemes.com
      </Typography>
    </Stack>
  );
}
