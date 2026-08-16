// ==============================|| OVERRIDES - INPUT LABEL ||============================== //

export default function InputLabel() {
  return {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '.MuiFormControl-root:has(.MuiInputBase-sizeSmall) > &.MuiInputLabel-outlined': {
            transform: `translate(14px, 12px) scale(1)`
          },
          '.MuiFormControl-root:has(.MuiInputBase-sizeSmall) > &.MuiInputLabel-outlined.MuiInputLabel-shrink': {
            transform: `translate(14px, -9px) scale(0.75)`
          }
        }
      }
    }
  };
}
