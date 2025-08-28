import { cloneElement, ReactElement } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

// project imports
import { ThemeMode } from 'config';
import MenuList from './MenuList';
import useConfig from 'hooks/useConfig';

// ==============================|| HORIZONTAL MENU LIST ||============================== //

interface ElevationScrollProps {
  children: ReactElement<{ elevation?: number }>;
  window?: Window | Node;
}

function ElevationScroll({ children, window }: ElevationScrollProps) {
  const theme = useTheme();

  /**
   * Note that you normally won't need to set the window ref as useScrollTrigger will default to window.
   * This is only being set here because the demo is in an iframe.
   */
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window!
  });

  theme.shadows[4] = theme.customShadows.z1;

  return cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

// ==============================|| HORIZONTAL MENU LIST ||============================== //

export default function HorizontalBar() {
  const { mode, container } = useConfig();

  return (
    <ElevationScroll>
      <AppBar
        sx={{
          top: 71,
          bgcolor: mode === ThemeMode.DARK ? 'background.default' : 'background.paper',
          width: '100%',
          height: 62,
          justifyContent: 'center',
          borderTop: '1px solid',
          borderColor: mode === ThemeMode.DARK ? 'background.paper' : 'grey.300',
          zIndex: 1098
        }}
      >
        <Container maxWidth={container ? 'lg' : false}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MenuList item={{
              id: undefined,
              link: undefined,
              icon: undefined,
              target: undefined,
              external: undefined,
              url: undefined,
              type: undefined,
              title: undefined,
              color: undefined,
              caption: undefined,
              breadcrumbs: undefined,
              disabled: undefined,
              chip: undefined,
              children: undefined,
              elements: undefined,
              search: undefined
            }} level={0} />
          </Box>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
}
