// ==============================|| OVERRIDES - AVATAR ||============================== //

export default function Avatar(theme) {
  return {
    MuiAvatar: {
      styleOverrides: {
        root: {
          // Define CSS variables for default colors
          '--avatar-default-color': theme.vars.palette.primary.dark,
          '--avatar-default-bg': theme.vars.palette.primary[200],

          // Use the variables
          color: 'var(--avatar-default-color)',
          backgroundColor: 'var(--avatar-default-bg)'
        }
      }
    }
  };
}
