import { useState, ChangeEvent, useEffect } from 'react';

// material-ui
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';

// third party
import { SnackbarProvider, useSnackbar } from 'notistack';

// project imports
import SubCard from '../ui-component/cards/SubCard';

import { dispatch, useSelector } from '../store';
import { handlerIconVariants } from '../store/slices/snackbar';

// assets
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

// ==============================|| NOTISTACK - CUSTOM ICON ||============================== //

function IconVariantsContent() {
  const [value, setValue] = useState('usedefault');
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);

    dispatch(
      handlerIconVariants({
        iconVariant: selectedValue,
        hideIconVariant: selectedValue === 'hide'
      })
    );
  };

  const handleClick = () => {
    enqueueSnackbar('Your notification here', { variant: 'info' });
  };

  return (
    <SubCard title="With Icons">
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          value={value}
          onChange={handleChange}
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="usedefault" control={<Radio />} label="Use Default" />
          <FormControlLabel value="useemojis" control={<Radio />} label="Use Emojis" />
          <FormControlLabel value="hide" control={<Radio />} label="Hide" />
        </RadioGroup>
      </FormControl>
      <Button variant="contained" fullWidth sx={{ marginBlockStart: 2 }} onClick={handleClick}>
        Show Snackbar
      </Button>
    </SubCard>
  );
}

export default function IconVariants() {
  const snackbarState = useSelector((state) => state.snackbar);
  const infoIcon = <InfoOutlinedIcon sx={{ mr: 1 }} />;
  const emojiIcon = <SentimentSatisfiedAltIcon sx={{ mr: 1 }} />;
  const [icon, setIcon] = useState(infoIcon);
  const [hideIcon, setHideIcon] = useState(false);

  useEffect(() => {
    if (snackbarState.iconVariant === 'useemojis') {
      setIcon(emojiIcon);
      setHideIcon(false);
    } else if (snackbarState.iconVariant === 'usedefault') {
      setIcon(infoIcon);
      setHideIcon(false);
    } else if (snackbarState.iconVariant === 'hide') {
      setHideIcon(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snackbarState.iconVariant]);

  return (
    <SnackbarProvider iconVariant={hideIcon ? undefined : { info: icon }} hideIconVariant={hideIcon} maxSnack={3}>
      <IconVariantsContent />
    </SnackbarProvider>
  );
}
