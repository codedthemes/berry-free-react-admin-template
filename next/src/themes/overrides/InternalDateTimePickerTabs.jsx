// ==============================|| OVERRIDES - INTERNAL DATE TIME PICKER TABS ||============================== //

export default function InternalDateTimePickerTabs(theme) {
  return {
    MuiInternalDateTimePickerTabs: {
      styleOverrides: {
        tabs: {
          backgroundColor: theme.vars.palette.primary.lighter,

          '& .MuiTabs-list': {
            borderColor: theme.vars.palette.primary.light
          },

          '& .MuiTab-root': {
            color: theme.vars.palette.grey[900]
          },

          '& .MuiTabs-indicator': {
            backgroundColor: theme.vars.palette.primary.dark
          },

          '& .Mui-selected': {
            color: theme.vars.palette.primary.dark
          }
        }
      }
    }
  };
}
