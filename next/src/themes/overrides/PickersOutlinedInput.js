// ==============================|| OVERRIDES - PICKERS OUTLINED INPUT ||============================== //

export default function PickersOutlinedInput(theme, borderRadius, outlinedFilled) {
  return {
    MuiPickersOutlinedInput: {
      defaultProps: {
        size: 'small'
      },
      styleOverrides: {
        root: {
          borderRadius: `${borderRadius}px`,
          background: outlinedFilled ? theme.vars.palette.grey[50] : 'transparent',
          paddingLeft: 14,
          paddingRight: 14,

          variants: [
            {
              props: { size: 'small' },
              style: { '& .MuiPickersSectionList-root': { paddingTop: 12, paddingBottom: 12 } }
            }
          ]
        },
        notchedOutline: { borderColor: theme.vars.palette.divider },
        input: { paddingLeft: 0, paddingRight: 0 }
      }
    }
  };
}
