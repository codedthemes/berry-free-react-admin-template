/***************************  OVERRIDES - SWITCH  ***************************/

export default function Switch(theme) {
  return {
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-switchBase.Mui-disabled .MuiSwitch-thumb': {
            backgroundColor: theme.vars.palette.grey[300]
          }
        }
      }
    }
  };
}
