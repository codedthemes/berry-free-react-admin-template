// material-ui
import { styled } from '@mui/material/styles';

// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const AuthWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  minHeight: '100vh',
}));

export default AuthWrapper;
