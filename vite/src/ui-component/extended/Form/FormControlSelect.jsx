import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

export default function FormControlSelect({
  captionLabel,
  currencies,
  formState,
  iconPrimary,
  iconSecondary,
  selected,
  textPrimary,
  textSecondary
}) {
  const IconPrimary = iconPrimary;
  const primaryIcon = iconPrimary ? <IconPrimary fontSize="small" sx={{ color: 'grey.700' }} /> : null;

  const IconSecondary = iconSecondary;
  const secondaryIcon = iconSecondary ? <IconSecondary fontSize="small" sx={{ color: 'grey.700' }} /> : null;

  const errorState = formState === 'error';
  const val = selected || '';

  const [currency, setCurrency] = useState(val);
  const handleChange = (event) => {
    event?.target.value && setCurrency(event?.target.value);
  };

  return (
    <FormControl fullWidth error={errorState}>
      <TextField
        id="outlined-select-currency"
        select
        fullWidth
        label={captionLabel}
        value={currency}
        onChange={handleChange}
        slotProps={{
          input: {
            startAdornment: (
              <>
                {primaryIcon && <InputAdornment position="start">{primaryIcon}</InputAdornment>}
                {textPrimary && (
                  <>
                    <InputAdornment position="start">{textPrimary}</InputAdornment>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                  </>
                )}
              </>
            ),
            endAdornment: (
              <>
                {secondaryIcon && <InputAdornment position="end">{secondaryIcon}</InputAdornment>}
                {textSecondary && (
                  <>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <InputAdornment position="end">{textSecondary}</InputAdornment>
                  </>
                )}
              </>
            )
          }
        }}
      >
        {currencies?.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
}

FormControlSelect.propTypes = {
  captionLabel: PropTypes.string,
  currencies: PropTypes.object,
  formState: PropTypes.string,
  iconPrimary: PropTypes.any,
  iconSecondary: PropTypes.any,
  selected: PropTypes.string,
  textPrimary: PropTypes.string,
  textSecondary: PropTypes.string
};
