// ==============================|| OVERRIDES - OUTLINED INPUT ||============================== //

export default function OutlinedInput(theme, borderRadius, outlinedFilled) {
  return {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: outlinedFilled ? theme.vars.palette.grey[50] : 'transparent',
          borderRadius: `${borderRadius}px`,

          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.vars.palette.grey[400]
          },

          '&:hover $notchedOutline': {
            borderColor: theme.vars.palette.primary.light
          },

          '&.MuiInputBase-multiline': {
            padding: 1
          }
        },
        input: {
          fontWeight: 500,
          background: outlinedFilled ? theme.vars.palette.grey[50] : 'transparent',
          padding: '15.5px 14px',
          borderRadius: `${borderRadius}px`,

          '&.MuiInputBase-inputSizeSmall': {
            padding: '10px 14px',

            '&.MuiInputBase-inputAdornedStart': {
              paddingLeft: 0
            }
          }
        },
        inputAdornedStart: {
          paddingLeft: 4
        },
        notchedOutline: {
          borderRadius: `${borderRadius}px`
        }
      }
    }
  };
}
