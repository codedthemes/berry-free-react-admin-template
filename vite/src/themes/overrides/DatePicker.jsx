// assets
import CalendarTodayTwoTone from '@mui/icons-material/CalendarTodayTwoTone';

// ==============================|| OVERRIDES - DATE PICKER ||============================== //

export default function DatePicker() {
  return {
    MuiDatePicker: {
      defaultProps: {
        slots: { openPickerIcon: () => <CalendarTodayTwoTone /> }
      }
    }
  };
}
