import { useState, ChangeEvent } from 'react';

// material-ul
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';
import Fade from '@mui/material/Fade';
import Zoom from '@mui/material/Zoom';

// third party
import { enqueueSnackbar } from 'notistack';

// project imports
import SubCard from '../ui-component/cards/SubCard';

// ==============================|| NOTISTACK - TRANSITIONS ||============================== //

export default function TransitionBar() {
  const [value, setValue] = useState<string>('slide');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleClick = () => {
    switch (value) {
      case 'slide':
        enqueueSnackbar('Your notification here', { TransitionComponent: Slide, variant: 'info' });
        break;
      case 'grow':
        enqueueSnackbar('Your notification here', { TransitionComponent: Grow, variant: 'info' });
        break;
      case 'fade':
        enqueueSnackbar('Your notification here', { TransitionComponent: Fade, variant: 'info' });
        break;
      case 'zoom':
        enqueueSnackbar('Your notification here', { TransitionComponent: Zoom, variant: 'info' });
        break;
      default:
        enqueueSnackbar('Your notification here', { TransitionComponent: Slide, variant: 'info' });
        break;
    }
  };

  return (
    <SubCard title="Animation">
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          value={value}
          onChange={handleChange}
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="slide" control={<Radio />} label="Slide" />
          <FormControlLabel value="grow" control={<Radio />} label="Grow" />
          <FormControlLabel value="fade" control={<Radio />} label="Fade" />
          <FormControlLabel value="zoom" control={<Radio />} label="Zoom" />
        </RadioGroup>
      </FormControl>
      <Button variant="contained" fullWidth sx={{ marginBlockStart: 2 }} onClick={() => handleClick()}>
        Show Snackbar
      </Button>
    </SubCard>
  );
}
