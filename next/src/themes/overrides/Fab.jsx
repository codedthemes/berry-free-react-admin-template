// ==============================|| OVERRIDES - FAB ||============================== //

export default function Fab() {
  return {
    MuiFab: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { variant: 'circular' }
            }
          ]
        }
      }
    }
  };
}
