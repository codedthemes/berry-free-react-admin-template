// material-ui
import { styled } from '@mui/material/styles';

// project imports
import { MenuOrientation, ThemeMode } from 'config';
import { drawerWidth } from 'store/constant';

interface MainStyleProps {
  open: boolean;
  menuOrientation: MenuOrientation;
  borderRadius: number;
}

// ==============================|| MAIN LAYOUT - STYLED ||============================== //

const MainContentStyled = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'menuOrientation' && prop !== 'borderRadius'
})<MainStyleProps>(({ theme, open, menuOrientation, borderRadius }) => ({
  backgroundColor: theme.palette.mode === ThemeMode.DARK ? theme.palette.dark[800] : theme.palette.grey[100],
  minWidth: '1%',
  width: '100%',
  minHeight: 'calc(100vh - 88px)',
  flexGrow: 1,
  padding: 20,
  marginTop: 88,
  marginRight: 20,
  borderRadius: `${borderRadius}px`,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  ...(!open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter + 200
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: menuOrientation === MenuOrientation.VERTICAL ? -(drawerWidth - 72) : 20,
      width: `calc(100% - ${drawerWidth}px)`,
      marginTop: menuOrientation === MenuOrientation.HORIZONTAL ? 135 : 88
    }
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shorter + 200
    }),
    marginLeft: menuOrientation === MenuOrientation.HORIZONTAL ? 20 : 0,
    marginTop: menuOrientation === MenuOrientation.HORIZONTAL ? 135 : 88,
    width: `calc(100% - ${drawerWidth}px)`,
    [theme.breakpoints.up('md')]: {
      marginTop: menuOrientation === MenuOrientation.HORIZONTAL ? 135 : 88
    }
  }),
  [theme.breakpoints.down('md')]: {
    marginLeft: 20,
    padding: 16,
    marginTop: 88,
    ...(!open && {
      width: `calc(100% - ${drawerWidth}px)`
    })
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: 10,
    marginRight: 10
  }
}));

export default MainContentStyled;
