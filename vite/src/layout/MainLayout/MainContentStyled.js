// material-ui
import { styled } from '@mui/material/styles';

// project imports
import { drawerWidth, HEADER_HEIGHT } from 'store/constant';

// ==============================|| MAIN LAYOUT - STYLED ||============================== //

const MainContentStyled = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'borderRadius'
})(({ theme, open, borderRadius }) => ({
  backgroundColor: theme.vars.palette.grey[100],
  minWidth: '1%',
  width: '100%',
  minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
  flexGrow: 1,
  padding: 20,
  marginTop: HEADER_HEIGHT,
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
      marginLeft: -(drawerWidth - 72),
      width: `calc(100% - ${drawerWidth}px)`,
      marginTop: HEADER_HEIGHT
    }
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shorter + 200
    }),
    marginLeft: 0,
    marginTop: HEADER_HEIGHT,
    width: `calc(100% - ${drawerWidth}px)`,
    [theme.breakpoints.up('md')]: {
      marginTop: HEADER_HEIGHT
    }
  }),
  [theme.breakpoints.down('md')]: {
    marginLeft: 20,
    padding: 16,
    marginTop: HEADER_HEIGHT,
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
