// ==============================|| OVERRIDES - SELECT ||============================== //

export default function Select() {
  return {
    MuiSelect: {
      defaultProps: {
        size: 'small'
      },
      styleOverrides: {
        root: {
          variants: [
            {
              props: { size: 'small' },
              style: { '& .MuiSelect-select': { paddingTop: 12, paddingBottom: 12 } }
            }
          ]
        },
        select: {
          height: 20,
          minHeight: `unset`,
          '&:focus': {
            backgroundColor: 'transparent'
          }
        }
      }
    }
  };
}
