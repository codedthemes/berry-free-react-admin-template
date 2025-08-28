// material-ui
import { Theme, alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';

// project imports
import { ThemeMode } from '../../config';
import useAuth from '../hooks/useAuth';

// assets
import Google from 'assets/images/icons/google.svg';
import Twitter from 'assets/images/icons/twitter.svg';
import Facebook from 'assets/images/icons/facebook.svg';

// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

export default function FirebaseSocial() {
  const theme = useTheme();
  const downSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  // @ts-ignore
  const { firebaseFacebookSignIn, firebaseGoogleSignIn, firebaseTwitterSignIn } = useAuth();
  const googleHandler = async () => {
    try {
      await firebaseGoogleSignIn();
    } catch (err) {
      console.error(err);
    }
  };

  const twitterHandler = async () => {
    try {
      await firebaseTwitterSignIn();
    } catch (err) {
      console.error(err);
    }
  };

  const facebookHandler = async () => {
    try {
      await firebaseFacebookSignIn();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Stack
      direction="row"
      spacing={{ xs: 1, sm: 2 }}
      sx={{ justifyContent: { xs: 'space-around', sm: 'space-between' }, '& .MuiButton-startIcon': { mr: 0 } }}
    >
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!downSM}
        startIcon={<CardMedia component="img" src={Google} alt="Google" />}
        onClick={googleHandler}
        sx={{
          color: 'grey.700',
          bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'grey.50',
          borderColor: theme.palette.mode === ThemeMode.DARK ? alpha(theme.palette.dark.light, 0.2) : 'grey.100'
        }}
      ></Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!downSM}
        startIcon={<CardMedia component="img" src={Twitter} alt="Twitter" />}
        onClick={twitterHandler}
        sx={{
          color: 'grey.700',
          bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'grey.50',
          borderColor: theme.palette.mode === ThemeMode.DARK ? alpha(theme.palette.dark.light, 0.2) : 'grey.100'
        }}
      ></Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!downSM}
        startIcon={<CardMedia component="img" src={Facebook} alt="Facebook" />}
        onClick={facebookHandler}
        sx={{
          color: 'grey.700',
          bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'grey.50',
          borderColor: theme.palette.mode === ThemeMode.DARK ? alpha(theme.palette.dark.light, 0.2) : 'grey.100'
        }}
      ></Button>
    </Stack>
  );
}
