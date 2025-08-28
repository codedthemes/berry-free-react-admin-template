import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third party
import OTPInput from 'react-otp-input';

// project imports
import { ThemeMode } from '../../config';

// ============================|| FIREBASE - CODE VERIFICATION ||============================ //

export default function AuthCodeVerification() {
  const theme = useTheme();
  const [otp, setOtp] = useState<string>();
  const borderColor = theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[200] : theme.palette.grey[300];

  return (
    <Stack sx={{ gap: 3 }}>
      <Box
        sx={{
          '& input:focus-visible': {
            borderColor: `${theme.palette.primary.main} !important`,
            boxShadow: `0px 0px 0px 1px ${theme.palette.primary.main}`
          }
        }}
      >
        <OTPInput
          value={otp}
          onChange={(otpNumber: string) => setOtp(otpNumber)}
          numInputs={4}
          inputType="tel"
          shouldAutoFocus
          containerStyle={{ gap: 6 }}
          inputStyle={{
            width: '100%',
            margin: '8px',
            padding: '10px',
            border: `1px solid ${borderColor}`,
            borderRadius: 4,
            outline: 'none'
          }}
          renderInput={(props) => <input {...props} />}
        />
      </Box>
      <Button disableElevation fullWidth size="large" type="submit" variant="contained">
        Continue
      </Button>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Typography>Did not receive the email? Check your spam filter, or</Typography>
        <Typography variant="body1" sx={{ minWidth: 85, ml: 2, textDecoration: 'none', cursor: 'pointer' }} color="primary">
          Resend code
        </Typography>
      </Stack>
    </Stack>
  );
}
