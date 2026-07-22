import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

// third party
import { useField } from 'formik';

// ==============================|| FORM - INPUT ||============================== //

export default function FormInput({ name, label, inputLabel, sx, inputLabelSx, onChange, helperText, id, required, ...rest }) {
  const [field, meta] = useField(name);
  const fieldId = id ?? name;

  const input = (
    <TextField
      fullWidth
      id={fieldId}
      label={label}
      {...field}
      value={field.value ?? ''}
      onChange={(e) => {
        field.onChange(e);
        onChange?.(e);
      }}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error ? String(meta.error) : helperText}
      required={required}
      {...rest}
    />
  );

  if (inputLabel) {
    return (
      <Stack sx={{ width: 1, gap: 0.75, ...sx }}>
        <InputLabel
          htmlFor={fieldId}
          required={required}
          sx={{
            fontWeight: 500,
            '& .MuiInputLabel-asterisk': { color: 'error.main' },
            ...inputLabelSx
          }}
        >
          {inputLabel}
        </InputLabel>
        {input}
      </Stack>
    );
  }

  return input;
}

FormInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.any,
  inputLabel: PropTypes.string,
  sx: PropTypes.object,
  inputLabelSx: PropTypes.object,
  onChange: PropTypes.any,
  helperText: PropTypes.any,
  id: PropTypes.any,
  required: PropTypes.any,
  rest: PropTypes.any
};
