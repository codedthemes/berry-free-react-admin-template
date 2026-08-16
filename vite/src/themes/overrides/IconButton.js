// project imports
import { withAlpha } from 'utils/colorUtils';

const colors = ['primary', 'secondary', 'success', 'error', 'warning', 'info'];

// ==============================|| OVERRIDES - ICON BUTTON ||============================== //

export default function IconButton(theme) {
  const createColorVariant = (color, variant, styleFn, theme) => {
    const paletteColor = theme.vars.palette[color];
    return {
      props: { variant, color },
      style: styleFn(paletteColor)
    };
  };

  const commonDisabledStyles = {
    '&.Mui-disabled': {
      backgroundColor: withAlpha(theme.vars.palette.grey[100], 0.5)
    },
    '&.Mui-disabled:not(.MuiIconButton-loading)': {
      color: theme.vars.palette.action.disabled
    }
  };

  const colorContainedVariants = colors.map((color) =>
    createColorVariant(
      color,
      'contained',
      (paletteColor) => ({
        color: paletteColor.contrastText,
        backgroundColor: paletteColor.main,
        '&:hover': {
          backgroundColor: paletteColor.dark
        },
        ...commonDisabledStyles
      }),
      theme
    )
  );

  const colorOutlinedVariants = colors.map((color) =>
    createColorVariant(
      color,
      'outlined',
      (paletteColor) => ({
        color: paletteColor.main,
        border: `1px solid ${paletteColor.main}`,
        '&.Mui-disabled': {
          borderColor: theme.vars.palette.action.disabledBackground
        }
      }),
      theme
    )
  );

  return {
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&.Mui-disabled': {
            pointerEvents: 'auto',
            cursor: 'not-allowed'
          },
          variants: [...colorContainedVariants, ...colorOutlinedVariants]
        },
        sizeSmall: { width: 36, height: 36 },
        sizeMedium: { width: 44, height: 44 },
        sizeLarge: { width: 52, height: 52 }
      }
    }
  };
}
