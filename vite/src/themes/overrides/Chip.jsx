// ===============================||  OVERRIDES - CHIP  ||=============================== //

export default function Chip() {
  return {
    MuiChip: {
      defaultProps: {
        color: 'primary',
        variant: 'light'
      },
      styleOverrides: {
        root: {
          variants: [
            {
              props: { variant: 'light' },
              style: ({ ownerState, theme }) => {
                const colorKey = ownerState.color;
                const paletteColor = theme.vars.palette[colorKey];

                if (!paletteColor) return {};

                return {
                  color: paletteColor.main,
                  backgroundColor: paletteColor.lighter,

                  '&.MuiChip-clickable': {
                    '&:hover': {
                      color: paletteColor.lighter,
                      backgroundColor: paletteColor.main
                    }
                  }
                };
              }
            }
          ],
          '&.MuiChip-deletable .MuiChip-deleteIcon': {
            color: 'inherit'
          }
        },
        sizeMedium: {
          height: 28
        },
        deleteIconMedium: {
          fontSize: 20,
          marginRight: 4
        },
        labelMedium: ({ ownerState }) => ({
          paddingLeft: ownerState.variant === 'outlined' ? 9 : 10,
          paddingRight: ownerState.variant === 'outlined' ? 9 : 10
        }),
        avatarMedium: {
          width: 20,
          height: 20,
          fontSize: 10
        },
        avatar: ({ ownerState, theme }) => {
          const colorKey = ownerState.color;
          const paletteColor = theme.vars.palette[colorKey];

          if (!paletteColor) return {};

          return {
            backgroundColor: paletteColor.main,
            color: theme.vars.palette.common.white
          };
        }
      }
    }
  };
}
