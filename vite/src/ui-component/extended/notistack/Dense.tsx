import { useState, ChangeEvent } from 'react';

// material-ul
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

// third party
import { enqueueSnackbar, SnackbarProvider } from 'notistack';

// project imports
import SubCard from '../ui-component/cards/SubCard';
import { handlerDense } from '../store/slices/snackbar';
import { dispatch } from '../store';

// ==============================|| NOTISTACK - DENSE ||============================== //

export default function Dense() {
  const [checked, setChecked] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    dispatch(handlerDense({ dense: event.target.checked }));
  };

  return (
    <SubCard title="Dense">
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={handleChange} slotProps={{ input: { 'aria-label': 'controlled' } }} />}
        label="Dense margins"
      />

      <SnackbarProvider dense={!checked ? true : false}>
        <Button variant="outlined" fullWidth sx={{ marginBlockStart: 2 }} onClick={() => enqueueSnackbar('Your notification here')}>
          Show snackbar
        </Button>
      </SnackbarProvider>
    </SubCard>
  );
}
