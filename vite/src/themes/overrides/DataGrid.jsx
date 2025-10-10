// ==============================|| OVERRIDES - DATA GRID ||============================== //

export default function DataGrid(theme) {
  return {
    MuiDataGrid: {
      defaultProps: {
        rowHeight: 54
      },
      styleOverrides: {
        root: {
          borderWidth: 0,

          '& .MuiDataGrid-columnHeader--filledGroup': {
            borderBottomWidth: 0
          },

          '& .MuiDataGrid-columnHeader--emptyGroup': {
            borderBottomWidth: 0
          },

          '& .MuiFormControl-root>.MuiInputBase-root': {
            backgroundColor: `${theme.vars.palette.background.default} !important`,
            borderColor: `${theme.vars.palette.divider} !important`
          }
        },
        withBorderColor: {
          borderColor: theme.vars.palette.divider
        },
        toolbarContainer: {
          '& .MuiButton-root': {
            paddingLeft: '16px !important',
            paddingRight: '16px !important'
          }
        },
        columnHeader: {
          color: theme.vars.palette.grey[600],
          paddingLeft: 24,
          paddingRight: 24
        },
        footerContainer: {
          '&.MuiDataGrid-withBorderColor': {
            borderBottom: 'none'
          }
        },
        columnHeaderCheckbox: {
          paddingLeft: 0,
          paddingRight: 0
        },
        cellCheckbox: {
          paddingLeft: 0,
          paddingRight: 0
        },
        cell: {
          borderWidth: 1,
          paddingLeft: 24,
          paddingRight: 24,
          borderColor: theme.vars.palette.divider,

          '&.MuiDataGrid-cell--withRenderer > div': {
            ' > .high': {
              background: theme.vars.palette.success.light
            },
            '& > .medium': {
              background: theme.vars.palette.warning.light
            },
            '& > .low': {
              background: theme.vars.palette.error.light
            }
          }
        }
      }
    }
  };
}
