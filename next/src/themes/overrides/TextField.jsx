// ==============================|| OVERRIDES - TEXT FIELD ||============================== //

export default function TextField() {
  return {
    MuiTextField: {
      defaultProps: {
        size: 'small'
      },
      styleOverrides: {
        root: {
          variants: [
            {
              props: { size: 'small' },
              style: { '.MuiSelect-select': { paddingTop: 12, paddingBottom: 12 } }
            }
          ]
        }
      }
    }
  };
}
