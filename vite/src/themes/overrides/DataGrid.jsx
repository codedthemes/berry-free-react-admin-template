// project imports
import { withAlpha } from 'utils/colorUtils';

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
            backgroundColor: `${theme.vars.palette.background.default} !important`
          },

          '--DataGrid-rowBorderColor': `${theme.vars.palette.divider} !important`,
          '& .MuiDataGrid-filler, & .MuiDataGrid-toolbar': {
            borderColor: `${theme.vars.palette.divider} !important`
          }
        },
        withBorderColor: {
          borderColor: `${withAlpha(theme.vars.palette.divider, 0.5)} !important`
        },
        toolbarContainer: {
          '& .MuiButton-root': {
            paddingLeft: '16px !important',
            paddingRight: '16px !important'
          }
        },
        columnHeader: {
          color: theme.vars.palette.grey[600],
          borderColor: `${theme.vars.palette.divider} !important`,

          paddingLeft: 24,
          paddingRight: 24
        },
        footerContainer: {
          paddingLeft: 24,
          paddingRight: 24,
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
          borderColor: `${withAlpha(theme.vars.palette.divider, 0.5)} !important`,

          '&.MuiDataGrid-cell--withRenderer > div': {
            ' > .high': {
              background: theme.vars.palette.success.lighter
            },
            '& > .medium': {
              background: theme.vars.palette.warning.lighter
            },
            '& > .low': {
              background: theme.vars.palette.error.lighter
            }
          }
        }
      }
    }
  };
}
