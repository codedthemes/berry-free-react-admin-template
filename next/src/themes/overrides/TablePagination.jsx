// ==============================|| OVERRIDES - TABLE PAGINATION ||============================== //

export default function TablePagination(theme, borderRadius) {
  return {
    MuiTablePagination: {
      styleOverrides: {
        root: {
          color: theme.vars.palette.text.secondary,
          '& .MuiInputBase-root.MuiTablePagination-select': {
            marginRight: 20,
            marginLeft: 10,
            border: `1px solid ${theme.vars.palette.divider}`,
            borderRadius: `${borderRadius}px`,
            backgroundColor: theme.vars.palette.grey[50]
          }
        },

        toolbar: {
          paddingLeft: 0,
          '&.MuiToolbar-root': {
            minHeight: 44,
            height: 44
          }
        },

        displayedRows: {
          marginBottom: 12,
          marginTop: 12
        },

        actions: {
          marginLeft: 0,
          '& .MuiIconButton-root': {
            width: 20,
            height: 20,
            '&.Mui-disabled': { '& .MuiSvgIcon-root': { color: theme.vars.palette.grey[300] } }
          },

          '& .MuiSvgIcon-root': {
            fontSize: 20,
            color: theme.vars.palette.text.primary
          }
        },

        select: {
          color: theme.vars.palette.text.secondary,
          paddingBottom: 8,
          paddingTop: 8
        }
      }
    }
  };
}
