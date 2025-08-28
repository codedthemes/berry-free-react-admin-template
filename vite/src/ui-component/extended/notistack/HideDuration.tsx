import { useState } from 'react';

// material-ul
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';

// third party
import { enqueueSnackbar } from 'notistack';

// project imports
import SubCard from '../ui-component/cards/SubCard';

function valueLabelFormat(value: number) {
  if (value === 11) return `persist`;
  return `${value}s`;
}

// ==============================|| NOTISTACK - TIMEOUT ||============================== //

export default function HideDuration() {
  const [value, setValue] = useState<number>(1);

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setValue(newValue);
    }
  };

  const marks = [
    {
      value: 1
    },
    {
      value: 3
    },
    {
      value: 5
    },
    {
      value: 7
    },
    {
      value: 9
    },
    {
      value: 11
    }
  ];

  return (
    <SubCard title="Hide Duration">
      <Slider
        value={value}
        min={1}
        step={2}
        max={11}
        valueLabelDisplay="on"
        marks={marks}
        getAriaValueText={valueLabelFormat}
        valueLabelFormat={valueLabelFormat}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{ marginBlockStart: 2 }}
        onClick={() => {
          if (value !== 11) {
            enqueueSnackbar('Your notification here', { autoHideDuration: value * 1000, variant: 'info' });
          } else {
            enqueueSnackbar('Your notification here', { persist: true, variant: 'info' });
          }
        }}
      >
        Show Snackbar
      </Button>
    </SubCard>
  );
}
