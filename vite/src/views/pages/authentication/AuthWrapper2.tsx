// material-ui
import { styled } from '@mui/material/styles';

// project imports
import { ThemeMode } from '../../config';

// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const AuthWrapper2 = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === ThemeMode.DARK ? theme.palette.background.default : theme.palette.background.paper,
  minHeight: '100vh',
  [theme.breakpoints.down('md')]: {
    backgroundColor: theme.palette.mode === ThemeMode.DARK ? theme.palette.dark.main : theme.palette.grey[100]
  }
}));

export default AuthWrapper2;
