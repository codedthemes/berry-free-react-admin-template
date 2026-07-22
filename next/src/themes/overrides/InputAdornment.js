// ==============================|| OVERRIDES - INPUT ADORNMENT ||============================== //

export default function InputAdornment(theme) {
  return {
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: theme.vars.palette.text.secondary,
          '& svg': { width: 20, height: 20 },
          '& .MuiIconButton-root': { color: 'inherit' },

          variants: [
            {
              props: { size: 'small' },
              style: {
                '.MuiButtonBase-root.MuiIconButton-root': {
                  width: 36,
                  height: 36,
                  marginRight: '-10px'
                }
              }
            }
          ]
        }
      }
    }
  };
}
