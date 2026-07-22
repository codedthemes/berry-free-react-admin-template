// ==============================|| OVERRIDES - TABLE ROW ||============================== //

export default function TableRow(theme) {
  return {
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.MuiTableRow-hover:hover:not(.Mui-selected)': {
            backgroundColor: theme.vars.palette.grey[50]
          },

          '&.Mui-selected': {
            backgroundColor: theme.vars.palette.primary.lighter
          },

          '&.Mui-selected.MuiTableRow-hover:hover': {
            backgroundColor: theme.vars.palette.primary.lighter
          }
        }
      }
    }
  };
}
