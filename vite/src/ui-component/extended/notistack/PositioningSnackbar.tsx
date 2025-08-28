// material-ul
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

// third party
import { enqueueSnackbar } from 'notistack';

// project imports
import SubCard from '../ui-component/cards/SubCard';

// ==============================|| NOTISTACK - POSTIONING ||============================== //

export default function PositioningSnackbar() {
  const theme = useTheme();
  const background = theme.palette.primary.main;

  return (
    <SubCard title="Positioning">
      <Grid container spacing={2}>
        <Grid>
          <Button
            variant="contained"
            onClick={() =>
              enqueueSnackbar('This is a top-left message', {
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'left'
                },
                style: { background }
              })
            }
          >
            Top-Left
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            onClick={() =>
              enqueueSnackbar('This is a top-center message', {
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'center'
                },
                style: { background }
              })
            }
          >
            Top-Center
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            onClick={() =>
              enqueueSnackbar('This is a top-right message', {
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
                },
                style: { background }
              })
            }
          >
            Top-right
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            onClick={() =>
              enqueueSnackbar('This is a bottom-left message', {
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left'
                },
                style: { background }
              })
            }
          >
            Bottom-left
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            onClick={() =>
              enqueueSnackbar('This is a bottom-center message', {
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'center'
                },
                style: { background }
              })
            }
          >
            Bottom-center
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            onClick={() =>
              enqueueSnackbar('This is a bottom-right message', {
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'right'
                },
                style: { background }
              })
            }
          >
            Bottom-Right
          </Button>
        </Grid>
      </Grid>
    </SubCard>
  );
}
