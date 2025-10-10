// ==============================|| OVERRIDES - BUTTON ||============================== //

export default function Button(theme) {
  return {
    MuiSlider: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: theme.vars.palette.grey[300]
          }
        },
        mark: {
          backgroundColor: theme.vars.palette.background.paper,
          width: '4px'
        },
        valueLabel: {
          color: theme.vars.palette.primary.light
        }
      }
    }
  };
}
