import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

// third party
import { useField } from 'formik';

// ==============================|| FORM - AUTOCOMPLETE ||============================== //

export default function FormAutocomplete({
  name,
  label,
  placeholder,
  required,
  options,
  textFieldProps,
  inputLabel,
  sx,
  id,
  inputLabelSx,
  onValueChange,
  renderInput: renderInputProp,
  ...rest
}) {
  const [field, meta, helpers] = useField(name);
  const fieldId = id ?? name;

  const selected = useMemo(() => {
    if (rest.multiple) {
      const formikValues = field.value || [];
      return options.filter((o) => formikValues.includes(o.value));
    }

    const found = options.find((o) => o.value === field.value);
    return found ?? (rest.freeSolo && field.value ? field.value : null);
  }, [field.value, options, rest.multiple, rest.freeSolo]);

  const errorState = meta.touched && Boolean(meta.error);
  const helperText = meta.touched && meta.error ? meta.error : undefined;

  const input = (
    <Autocomplete
      fullWidth
      options={options ?? []}
      value={selected ?? null}
      id={fieldId}
      getOptionLabel={(option) => {
        if (option == null) {
          return '';
        }
        return typeof option === 'string' ? option : option.label;
      }}
      isOptionEqualToValue={(option, val) => {
        if (option == null || val == null) {
          return false;
        }
        const valueToCheck = typeof val === 'string' ? val : val.value;
        return option.value === valueToCheck;
      }}
      onChange={(event, val, reason, details) => {
        if (rest.multiple) {
          const selectedArray = val || [];
          helpers.setValue(selectedArray.map((o) => (typeof o === 'string' ? o : o.value)));
        } else {
          const newVal = val;
          helpers.setValue(typeof newVal === 'string' ? newVal : (newVal?.value ?? ''));
        }
        onValueChange?.(event, val, reason, details);
      }}
      onBlur={() => helpers.setTouched(true)}
      renderInput={(params) => {
        const { InputProps: pInputProps, inputProps: phtmlInputProps, slotProps: pSlotProps, ...otherParams } = params;
        const { InputProps: tfInputProps, inputProps: tfhtmlInputProps, slotProps: tfSlotProps, ...otherTfProps } = textFieldProps || {};

        return renderInputProp ? (
          renderInputProp(params)
        ) : (
          <TextField
            {...otherParams}
            {...otherTfProps}
            name={name}
            label={label}
            placeholder={placeholder}
            required={required}
            error={errorState}
            helperText={helperText}
            slotProps={{
              ...pSlotProps,
              ...tfSlotProps,
              input: {
                ...pInputProps,
                ...pSlotProps?.input,
                ...tfInputProps,
                ...tfSlotProps?.input
              },
              htmlInput: {
                ...phtmlInputProps,
                ...pSlotProps?.htmlInput,
                ...tfhtmlInputProps,
                ...tfSlotProps?.htmlInput
              }
            }}
          />
        );
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

FormAutocomplete.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.any,
  textFieldProps: PropTypes.object,
  inputLabel: PropTypes.string,
  sx: PropTypes.object,
  id: PropTypes.any,
  inputLabelSx: PropTypes.object,
  onValueChange: PropTypes.object,
  renderInput: PropTypes.node,
  rest: PropTypes.any
};
