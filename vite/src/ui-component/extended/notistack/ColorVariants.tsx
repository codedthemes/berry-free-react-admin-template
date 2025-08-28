// material-ul
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

// third party
import { enqueueSnackbar, MaterialDesignContent, SnackbarProvider } from 'notistack';

// project imports
import SubCard from '../ui-component/cards/SubCard';

const StyledMaterialDesignContent = styled(MaterialDesignContent)(({ theme }) => ({
  '&.notistack-MuiContent-warning': {
    color: theme.palette.common.black
  }
}));

// ==============================|| NOTISTACK - COLOR VARIANTS ||============================== //

export default function ColorVariants() {
  return (
    <SnackbarProvider Components={{ warning: StyledMaterialDesignContent }}>
      <SubCard title="Color Variants">
        <Grid container spacing={2}>
          <Grid>
            <Button
              variant="contained"
              sx={{ bgcolor: 'grey.900', '&:hover': { bgcolor: 'grey.700' } }}
              onClick={() => enqueueSnackbar('This is default message.')}
            >
              Default
            </Button>
          </Grid>
          <Grid>
            <Button variant="contained" color="success" onClick={() => enqueueSnackbar('This is success message', { variant: 'success' })}>
              Success
            </Button>
          </Grid>
          <Grid>
            <Button variant="contained" color="warning" onClick={() => enqueueSnackbar('This is warning message', { variant: 'warning' })}>
              Warning
            </Button>
          </Grid>
          <Grid>
            <Button variant="contained" color="info" onClick={() => enqueueSnackbar('This is info message', { variant: 'info' })}>
              Info
            </Button>
          </Grid>
          <Grid>
            <Button variant="contained" color="error" onClick={() => enqueueSnackbar('This is error message', { variant: 'error' })}>
              Error
            </Button>
          </Grid>
        </Grid>
      </SubCard>
    </SnackbarProvider>
  );
}
