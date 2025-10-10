// ==============================|| OVERRIDES - LIST ITEM ICON ||============================== //

export default function ListItemIcon(theme) {
  return {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: theme.vars.palette.text.primary,
          minWidth: '36px'
        }
      }
    }
  };
}
