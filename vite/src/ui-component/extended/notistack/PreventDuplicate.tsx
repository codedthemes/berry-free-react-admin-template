import React from 'react';

// material-ul
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';

// third party
import { enqueueSnackbar } from 'notistack';

// project imports
import SubCard from '../ui-component/cards/SubCard';

// ==============================|| NOTISTACK - PREVENT DUPLICATE ||============================== //

export default function PreventDuplicate() {
  const [checked, setChecked] = React.useState(true);

  const handleChangeCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <SubCard title="Prevent Duplicate">
      <Stack sx={{ flexDirection: 'row', gap: 1, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        <Checkbox checked={checked} onChange={handleChangeCheck} slotProps={{ input: { 'aria-label': 'controlled' } }} />
        Prevent duplicate
        <Button
          variant="outlined"
          fullWidth
          sx={{ marginBlockStart: 2 }}
          onClick={() =>
            enqueueSnackbar('You only see me once', {
              preventDuplicate: checked ? true : false,
              variant: 'info'
            })
          }
        >
          Show snackbar
        </Button>
      </Stack>
    </SubCard>
  );
}
