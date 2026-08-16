// ==============================|| OVERRIDES - SLIDER ||============================== //

export default function Slider(theme) {
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
          backgroundColor: theme.vars.palette.grey[700],
          color: theme.vars.palette.primary.lighter
        }
      }
    }
  };
}
