// project imports
import { withAlpha } from 'utils/colorUtils';

// ==============================|| OVERRIDES - BUTTON ||============================== //

export default function Button(theme) {
  const disabledButtonBackground = withAlpha(theme.vars.palette.grey[100], 0.5);

  return {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          borderRadius: 8,

          '&.Mui-disabled': {
            cursor: 'not-allowed',
            pointerEvents: 'auto',
            '&.MuiButton-contained': {
              backgroundColor: disabledButtonBackground
            },
            '&:hover': {
              backgroundColor: 'transparent',
              '&.MuiButton-contained': {
                backgroundColor: disabledButtonBackground
              }
            }
          },

          // loading styles
          '&.MuiButton-loading': {
            '.MuiButton-loadingIndicator': { position: 'relative' },

            // Styles specific to loadingPositionEnd
            '&.MuiButton-loadingPositionEnd': {
              '.MuiButton-loadingIndicator': { right: 'unset', marginLeft: 8 },
              '.MuiButton-endIcon': { display: 'none' }
            },

            // Styles specific to loadingPositionStart
            '&.MuiButton-loadingPositionStart': {
              '.MuiButton-loadingIndicator': { left: 'unset', marginRight: 8 },
              '.MuiButton-startIcon': { display: 'none' }
            }
          },
          variants: [{ props: { variant: 'contained' } }]
        },
        sizeSmall: {
          height: 36,
          fontSize: 12,
          lineHeight: '20px',
          letterSpacing: 0,
          padding: '8px 16px'
        },
        sizeMedium: {
          height: 44,
          fontSize: 14,
          lineHeight: '20px',
          letterSpacing: 0,
          padding: '12px 16px'
        },
        sizeLarge: {
          height: 52,
          fontSize: 16,
          lineHeight: '20px',
          letterSpacing: 0,
          padding: 16
        }
      }
    }
  };
}
