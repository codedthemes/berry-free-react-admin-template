// ==============================|| OVERRIDES - LIST ITEM BUTTON ||============================== //

export default function ListItemButton(theme) {
  return {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: theme.vars.palette.text.primary,
          paddingTop: '10px',
          paddingBottom: '10px',

          '&.Mui-selected': {
            color: theme.vars.palette.secondary.dark,
            backgroundColor: theme.vars.palette.secondary.light,
            '&:hover': {
              backgroundColor: theme.vars.palette.secondary.light
            },
            '& .MuiListItemIcon-root': {
              color: theme.vars.palette.secondary.dark
            }
          },

          '&:hover': {
            backgroundColor: theme.vars.palette.secondary.light,
            color: theme.vars.palette.secondary.dark,
            '& .MuiListItemIcon-root': {
              color: theme.vars.palette.secondary.dark
            }
          }
        }
      }
    }
  };
}
