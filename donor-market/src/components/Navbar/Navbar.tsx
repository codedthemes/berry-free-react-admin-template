import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Hidden,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../Logo/Logo';

// material-ui
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const theme = useTheme();

  return (
    <AppBar position="static">
      <Toolbar>
        <Hidden mdUp>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Hidden smDown>
          <IconButton edge="end" color="inherit" aria-label="logo">
            <Logo color={theme.palette.common.white} />
          </IconButton>
        </Hidden>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Blood Donor Market
        </Typography>
        <Hidden mdUp>
          <IconButton edge="start" color="inherit" aria-label="logo">
            <Logo />
          </IconButton>
        </Hidden>
        <Hidden smDown>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Sign Up</Button>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
