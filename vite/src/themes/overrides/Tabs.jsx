// ==============================|| OVERRIDES - TABS ||============================== //

export default function Tabs(theme) {
  return {
    MuiTabs: {
      styleOverrides: {
        flexContainer: {
          borderBottom: '1px solid',
          borderColor: theme.vars.palette.grey[200]
        }
      }
    }
  };
}
