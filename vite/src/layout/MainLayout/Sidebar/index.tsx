import { memo, useMemo } from 'react';

// material-ui
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Chip from '@mui/material/Chip';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MenuCard from './MenuCard';
import MenuList from '../MenuList';
import LogoSection from '../LogoSection';
import MiniDrawerStyled from './MiniDrawerStyled';

import { MenuOrientation } from 'config';
import useConfig from 'hooks/useConfig';
import { drawerWidth } from 'store/constant';

import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';

// ==============================|| SIDEBAR DRAWER ||============================== //

function Sidebar() {
  const downMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const { menuOrientation, miniDrawer, mode } = useConfig();

  const logo = useMemo(
    () => (
      <Box sx={{ display: 'flex', p: 2 }}>
        <LogoSection />
      </Box>
    ),
    []
  );

  const drawer = useMemo(() => {
    const isVerticalOpen = menuOrientation === MenuOrientation.VERTICAL && drawerOpen;
    const drawerContent = (
      <>
        <MenuCard />
        <Stack direction="row" sx={{ justifyContent: 'center', mb: 2 }}>
          <Chip label={import.meta.env.VITE_APP_VERSION} size="small" color="default" />
        </Stack>
      </>
    );

    let drawerSX = { paddingLeft: '0px', paddingRight: '0px', marginTop: '20px' };
    if (drawerOpen) drawerSX = { paddingLeft: '16px', paddingRight: '16px', marginTop: '0px' };

    return (
      <>
        {downMD ? (
          <Box sx={drawerSX}>
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
            {isVerticalOpen && drawerContent}
          </Box>
        ) : (
          <PerfectScrollbar style={{ height: 'calc(100vh - 88px)', ...drawerSX }}>
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
            {isVerticalOpen && drawerContent}
          </PerfectScrollbar>
        )}
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downMD, drawerOpen, menuOrientation, mode]);

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, width: { xs: 'auto', md: drawerWidth } }} aria-label="mailbox folders">
      {downMD || (miniDrawer && drawerOpen) ? (
        <Drawer
          variant={downMD ? 'temporary' : 'persistent'}
          anchor="left"
          open={drawerOpen}
          onClose={() => handlerDrawerOpen(!drawerOpen)}
          sx={{
            '& .MuiDrawer-paper': {
              mt: downMD ? 0 : 11,
              zIndex: 1099,
              width: drawerWidth,
              bgcolor: 'background.default',
              color: 'text.primary',
              borderRight: 'none'
            }
          }}
          ModalProps={{ keepMounted: true }}
          color="inherit"
        >
          {downMD && logo}
          {drawer}
        </Drawer>
      ) : (
        <MiniDrawerStyled variant="permanent" open={drawerOpen}>
          {logo}
          {drawer}
        </MiniDrawerStyled>
      )}
    </Box>
  );
}

export default memo(Sidebar);
