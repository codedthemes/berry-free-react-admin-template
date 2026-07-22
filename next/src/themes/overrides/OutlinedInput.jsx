// ==============================|| OVERRIDES - OUTLINED INPUT ||============================== //

export default function OutlinedInput(theme, borderRadius, outlinedFilled) {
  return {
    MuiOutlinedInput: {
      defaultProps: {
        size: 'small'
      },
      styleOverrides: {
        root: {
          background: outlinedFilled ? theme.vars.palette.grey[50] : 'transparent',
          borderRadius: `${borderRadius}px`,
          paddingLeft: 14,
          paddingRight: 14,

          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.vars.palette.primary.lighter
          },

          '&.Mui-disabled': {
            cursor: 'not-allowed',
            input: { cursor: 'not-allowed' },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.vars.palette.divider }
          },
          variants: [
            {
              props: { size: 'small' },
              style: {
                '& input': { paddingTop: 12, paddingBottom: 12, height: 20 }
              }
            }
          ]
        },
        multiline: { padding: `12px 14px` },
        notchedOutline: { borderColor: theme.vars.palette.divider },
        input: { paddingLeft: 0, paddingRight: 0 }
      }
    }
  };
}
