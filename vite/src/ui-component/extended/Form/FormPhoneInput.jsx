import PropTypes from 'prop-types';
// material-ui
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

// third party
import { useField } from 'formik';

// assets
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

// ==============================|| FORM - PHONE INPUT ||============================== //

export default function FormPhoneInput({
  name,
  dialCodeName,
  dialCodes,
  label,
  inputLabel,
  sx,
  inputLabelSx,
  onChange,
  helperText,
  id,
  required,
  ...rest
}) {
  const [field, meta] = useField(name);
  const [dialCodeField] = useField(dialCodeName);

  const fieldId = id ?? name;

  const input = (
    <TextField
      fullWidth
      id={fieldId}
      label={label}
      {...field}
      onChange={(e) => {
        field.onChange(e);
        onChange?.(e);
      }}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error ? meta.error : helperText}
      required={inputLabel ? false : required}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Select
                id={`${dialCodeName}-select`}
                IconComponent={KeyboardArrowDownOutlinedIcon}
                {...dialCodeField}
                value={dialCodeField.value}
                disableUnderline
                variant="standard"
                disabled={rest.disabled}
              >
                {dialCodes.map((option) => (
                  <MenuItem key={option.code} value={option.dial}>
                    {option.code}
                  </MenuItem>
                ))}
                {dialCodeField.value && !dialCodes.find((c) => c.dial === dialCodeField.value) && (
                  <MenuItem value={dialCodeField.value}>{dialCodeField.value}</MenuItem>
                )}
              </Select>
              <Divider orientation="vertical" sx={{ height: 28, m: 0.5 }} />
            </InputAdornment>
          )
        }
      }}
      {...rest}
    />
  );

  if (inputLabel) {
    return (
      <Stack sx={{ width: 1, gap: 0.75, ...sx }}>
        <InputLabel
          htmlFor={fieldId}
          required={required}
          sx={{ fontWeight: 500, '& .MuiInputLabel-asterisk': { color: 'error.main' }, ...inputLabelSx }}
        >
          {inputLabel}
        </InputLabel>
        {input}
      </Stack>
    );
  }

  return input;
}

FormPhoneInput.propTypes = {
  name: PropTypes.string,
  dialCodeName: PropTypes.string,
  dialCodes: PropTypes.object,
  label: PropTypes.any,
  inputLabel: PropTypes.string,
  sx: PropTypes.any,
  inputLabelSx: PropTypes.any,
  onChange: PropTypes.any,
  helperText: PropTypes.any,
  id: PropTypes.any,
  required: PropTypes.any,
  rest: PropTypes.any
};
