// ==============================|| OVERRIDES - TABLE CELL ||============================== //

export default function TableCell(theme) {
  return {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: theme.vars.palette.grey[200]
        },
        head: {
          color: theme.vars.palette.grey[900],
          ':has(.MuiCheckbox-root)': {
            paddingTop: 7,
            paddingBottom: 7
          }
        },
        body: { paddingTop: 14, paddingBottom: 14 }
      }
    }
  };
}
