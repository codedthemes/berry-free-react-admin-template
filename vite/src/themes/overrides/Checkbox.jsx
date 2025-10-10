// ==============================|| OVERRIDES - CHECKBOX ||============================== //

export default function Checkbox() {
  return {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '& + .MuiFormControlLabel-label': {
            marginTop: 2
          }
        }
      }
    }
  };
}
