// material-ui
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';

// project imports
import AnimateButton from '../ui-component/extended/AnimateButton';
import { gridSpacing } from '../store/constant';

// ===========================|| MAILER SUBSCRIBER ||=========================== //

export default function MailerSubscriber() {
  return (
    <Grid container spacing={gridSpacing} sx={{ alignItems: 'center' }}>
      <Grid size="grow">
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-email-forgot">Email Address</InputLabel>
          <OutlinedInput id="outlined-adornment-email-forgot" type="email" name="email" label="Email Address" />
        </FormControl>
      </Grid>
      <Grid>
        <AnimateButton>
          <Button
            disableElevation
            type="submit"
            variant="contained"
            size="large"
            sx={{
              px: 2.75,
              py: 1.5
            }}
          >
            Subscribe
          </Button>
        </AnimateButton>
      </Grid>
    </Grid>
  );
}
