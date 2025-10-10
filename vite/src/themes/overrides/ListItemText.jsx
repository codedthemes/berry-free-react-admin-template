// ==============================|| OVERRIDES - LIST ITEM TEXT ||============================== //

export default function ListItemText(theme) {
  return {
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: theme.vars.palette.text.dark
        }
      }
    }
  };
}
