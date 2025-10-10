// ==============================|| OVERRIDES - SELECT ||============================== //

export default function Select() {
  return {
    MuiSelect: {
      styleOverrides: {
        select: {
          '&:focus': {
            backgroundColor: 'transparent'
          }
        }
      }
    }
  };
}
