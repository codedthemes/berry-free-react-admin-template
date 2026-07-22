// ==============================|| OVERRIDES - TIMELINE CONTENT ||============================== //

export default function TimelineContent(theme) {
  return {
    MuiTimelineContent: {
      styleOverrides: {
        root: {
          color: theme.vars.palette.text.dark,
          fontSize: '16px'
        }
      }
    }
  };
}
