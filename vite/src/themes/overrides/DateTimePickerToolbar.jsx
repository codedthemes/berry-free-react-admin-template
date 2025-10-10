// ==============================|| OVERRIDES - DATE TIME PICKER TOOLBAR ||============================== //

export default function DateTimePickerToolbar() {
  return {
    MuiDateTimePickerToolbar: {
      styleOverrides: {
        timeDigitsContainer: {
          alignItems: 'center'
        }
      }
    }
  };
}
