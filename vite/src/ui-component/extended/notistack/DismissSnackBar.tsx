// material-ul
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// third party
import { useSnackbar } from 'notistack';

// project imports
import SubCard from '../ui-component/cards/SubCard';

// ==============================|| NOTISTACK - DISMISS ||============================== //

export default function DismissSnackBar() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <SubCard title="Dismiss Programmatically">
      <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          fullWidth
          color="error"
          sx={{ marginBlockStart: 2, marginInlineEnd: 2 }}
          onClick={() =>
            enqueueSnackbar('No connection!', {
              variant: 'error',
              persist: true,
              anchorOrigin: { horizontal: 'center', vertical: 'bottom' }
            })
          }
        >
          Simulate connection loss
        </Button>
        <Button variant="outlined" fullWidth sx={{ marginBlockStart: 2 }} onClick={() => closeSnackbar()}>
          Back Online
        </Button>
      </Stack>
    </SubCard>
  );
}
