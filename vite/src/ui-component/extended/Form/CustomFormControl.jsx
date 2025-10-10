import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';

const CustomFormControl = styled(FormControl)(() => ({
  marginTop: 8,
  marginBottom: 8,
  '& > label': {
    top: 23,
    left: 0,
    '&[data-shrink="false"]': {
      top: 5
    }
  },
  '& > div > input': {
    padding: '30.5px 14px 11.5px !important'
  },
  '& legend': {
    display: 'none'
  },
  '& fieldset': {
    top: 0
  }
}));

export default CustomFormControl;
