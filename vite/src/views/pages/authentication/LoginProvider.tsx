import { Link as RouterLink, useSearchParams } from 'react-router-dom';

// material-ui
import { Theme, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

// project imports
import { AuthProvider, APP_AUTH } from '../../config';

// assets
import Jwt from 'assets/images/icons/jwt.svg';
import Firebase from 'assets/images/icons/firebase.svg';
import Auth0 from 'assets/images/icons/auth0.svg';
import Aws from 'assets/images/icons/aws.svg';
import Supabase from 'assets/images/icons/supabase.svg';

interface LoginProps {
  currentLoginWith: string;
}

// ==============================|| SOCIAL BUTTON ||============================== //

export default function LoginProvider({ currentLoginWith }: LoginProps) {
  const theme = useTheme();
  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  const [searchParams] = useSearchParams();
  const auth = searchParams.get('auth'); // get auth and set route based on that

  const loginHandlers = {
    Jwt: APP_AUTH === AuthProvider.JWT ? '/login' : '/login?auth=jwt',
    Firebase: APP_AUTH === AuthProvider.FIREBASE ? '/login' : '/login?auth=firebase',
    Auth0: APP_AUTH === AuthProvider.AUTH0 ? '/login' : '/login?auth=auth0',
    Aws: APP_AUTH === AuthProvider.AWS ? '/login' : '/login?auth=aws',
    Supabase: APP_AUTH === AuthProvider.SUPABASE ? '/login' : '/login?auth=supabase'
  };

  const buttonData = [
    { name: 'jwt', icon: Jwt, url: loginHandlers.Jwt },
    { name: 'firebase', icon: Firebase, url: loginHandlers.Firebase },
    { name: 'auth0', icon: Auth0, url: loginHandlers.Auth0 },
    { name: 'aws', icon: Aws, url: loginHandlers.Aws },
    { name: 'supabase', icon: Supabase, url: loginHandlers.Supabase }
  ];

  const currentLoginExists = buttonData.some((button) => button.name === currentLoginWith);

  return (
    <Stack
      direction="row"
      sx={{ gap: 1, justifyContent: 'center', '& .MuiButton-startIcon': { mr: { xs: 0, md: 1 }, ml: { xs: 0, sm: -0.5, md: 1 } } }}
    >
      {buttonData
        .filter((button) => {
          if (auth) {
            return button.name !== auth;
          }
          if (currentLoginExists) {
            return button.name !== currentLoginWith;
          }
          return button.name !== APP_AUTH;
        })
        .map((button) => (
          <Tooltip title={button.name} key={button.name}>
            <Button
              sx={{
                borderColor: theme.palette.grey[300],
                color: theme.palette.grey[900],
                '&:hover': { borderColor: theme.palette.primary[400], backgroundColor: theme.palette.primary[100] }
              }}
              variant="outlined"
              color="secondary"
              startIcon={<CardMedia component="img" src={button.icon} alt={button.name} />}
              component={RouterLink}
              to={button.url}
              target="_blank"
            >
              {!downLG && button.name}
            </Button>
          </Tooltip>
        ))}
    </Stack>
  );
}
