import { useState, useRef, useEffect } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// third party
import { useSnackbar, SnackbarKey } from 'notistack';

// project imports
import SubCard from '../ui-component/cards/SubCard';
import { dispatch } from '../store';
import { handlerIncrease } from '../store/slices/snackbar';

// assets
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

// ==============================|| NOTISTACK - MAXIMUM SNACKBAR ||============================== //

export default function MaxSnackbar() {
  const width = { minWidth: 'auto' };
  const [value, setValue] = useState<number>(3);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // Ref to track active snackbar keys
  const snackbarKeys = useRef<SnackbarKey[]>([]);

  const handlerMaxStack = () => {
    // Enqueue a new snackbar and track its key
    const key = enqueueSnackbar('Your notification here', {
      variant: 'info',
      autoHideDuration: 3000,
      persist: false // This will allow snackbars to stack as per maxStack
    });

    snackbarKeys.current.push(key);

    // Dispatch the updated maxStack value to Redux
    dispatch(handlerIncrease({ maxStack: value }));
  };

  // Handle removing excess snackbars when reducing the maxStack
  useEffect(() => {
    if (snackbarKeys.current.length > value) {
      // Close excess snackbars
      const excessSnackbars = snackbarKeys.current.length - value;
      for (let i = 0; i < excessSnackbars; i++) {
        const keyToClose = snackbarKeys.current.shift(); // Remove the earliest snackbar
        if (keyToClose) {
          closeSnackbar(keyToClose);
        }
      }
    }
  }, [value, closeSnackbar]);

  return (
    <SubCard title="Maximum Snackbars">
      <Stack sx={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <Button variant="outlined" size="small" sx={width} disabled={value <= 1} onClick={() => setValue((prev) => prev - 1)}>
          <RemoveOutlinedIcon />
        </Button>
        <Typography variant="body1">Stack up to {value}</Typography>
        <Button variant="outlined" size="small" sx={width} disabled={value >= 4} onClick={() => setValue((prev) => prev + 1)}>
          <AddOutlinedIcon />
        </Button>
      </Stack>
      <Button variant="contained" fullWidth sx={{ marginBlockStart: 2 }} onClick={handlerMaxStack}>
        Show Snackbar
      </Button>
    </SubCard>
  );
}
