'use client';
import PropTypes from 'prop-types';

import { Activity, Fragment, useEffect, useState } from 'react';

// next
import { usePathname } from 'next/navigation';

// material-ui
import { useTheme } from '@mui/material/styles';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import NavCollapse from '../NavCollapse';
import NavItem from '../NavItem';

import useConfig from 'hooks/useConfig';
import Transitions from 'ui-component/extended/Transitions';
import { useGetMenuMaster } from 'api/menu';

// assets
import { IconChevronDown, IconChevronRight, IconMinusVertical } from '@tabler/icons-react';

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

export default function NavGroup({ item, lastItem, remItems, lastItemId, selectedID, setSelectedID }) {
  const theme = useTheme();
  const pathname = usePathname();

  const {
    state: { borderRadius }
  } = useConfig();
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const isHorizontal = false;

  const [anchorEl, setAnchorEl] = useState(null);
  const [currentItem, setCurrentItem] = useState(item);

  const openMini = Boolean(anchorEl);

  useEffect(() => {
    if (lastItem) {
      if (item.id === lastItemId) {
        const localItem = { ...item };
        const elements = remItems.map((ele) => ele.elements);
        localItem.children = elements.flat(1);
        setCurrentItem(localItem);
      } else {
        setCurrentItem(item);
      }
    }
  }, [item, lastItem, remItems, lastItemId]);

  const checkOpenForParent = (child, id) => {
    child.forEach((ele) => {
      if (ele.children?.length) {
        checkOpenForParent(ele.children, currentItem.id);
      }

      if (pathname && pathname.includes('product-details')) {
        if (ele.url && ele.url.includes('product-details')) {
          setSelectedID(id);
        }
      }

      if (pathname && pathname.includes('social-profile')) {
        if (ele.url && ele.url.includes('social-profile')) {
          setSelectedID(id);
        }
      }

      if (ele.url === pathname) {
        setSelectedID(id);
      }
    });
  };

  const checkSelectedOnload = (data) => {
    const childrens = data.children ? data.children : [];
    childrens.forEach((itemCheck) => {
      if (itemCheck?.children?.length) {
        checkOpenForParent(itemCheck.children, currentItem.id);
      }
      if (itemCheck?.url === pathname) {
        setSelectedID(currentItem.id);
      }
    });

    if (pathname && pathname.includes('social-profile')) {
      if (data?.url && data?.url.includes('social-profile')) {
        setSelectedID(currentItem.id);
      }
    }
  };

  // keep selected-menu on page load and use for horizontal menu close on change routes
  useEffect(() => {
    checkSelectedOnload(currentItem);
    if (openMini) setAnchorEl(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, currentItem]);

  const handleClick = (event) => {
    if (!openMini) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Icon = currentItem?.icon;
  const itemIcon = currentItem?.icon ? <Icon stroke={1.5} size="20px" /> : null;

  // menu list collapse & items
  const items = currentItem.children?.map((menu) => {
    switch (menu?.type) {
      case 'collapse':
        return <NavCollapse key={menu.id} menu={menu} level={1} parentId={currentItem.id} />;
      case 'item':
        return <NavItem key={menu.id} item={menu} level={1} />;
      default:
        return (
          <Typography key={menu?.id} variant="h6" align="center" sx={{ color: 'error.main' }}>
            Menu Items Error
          </Typography>
        );
    }
  });

  const moreItems = remItems.map((itemRem, i) => (
    <Fragment key={i}>
      {itemRem.url ? (
        <NavItem item={itemRem} level={1} />
      ) : (
        <Activity mode={itemRem.title ? 'visible' : 'hidden'}>
          <Typography variant="caption" sx={{ pl: 2 }}>
            {itemRem.title} {itemRem.url}
          </Typography>
        </Activity>
      )}
      {itemRem?.elements?.map((menu) => {
        switch (menu?.type) {
          case 'collapse':
            return <NavCollapse key={menu.id} menu={menu} level={1} parentId={currentItem.id} />;
          case 'item':
            return <NavItem key={menu.id} item={menu} level={1} />;
          default:
            return (
              <Typography key={menu.id} variant="h6" align="center" sx={{ color: 'error.main' }}>
                Menu Items Error
              </Typography>
            );
        }
      })}
    </Fragment>
  ));

  const popperId = openMini ? `group-pop-${item.id}` : undefined;
  const isSelected = selectedID === currentItem.id;

  return (
    <>
      {!isHorizontal ? (
        <>
          <List
            disablePadding={!drawerOpen}
            subheader={
              currentItem.title &&
              drawerOpen && (
                <Typography
                  variant="caption"
                  gutterBottom
                  sx={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'text.heading',
                    padding: 0.75,
                    textTransform: 'capitalize',
                    marginTop: 1.25
                  }}
                >
                  {currentItem.title}
                  {currentItem.caption && (
                    <Typography
                      gutterBottom
                      sx={{
                        display: 'block',
                        fontSize: '0.6875rem',
                        fontWeight: 500,
                        color: 'text.secondary',
                        textTransform: 'capitalize',
                        lineHeight: 1.66
                      }}
                    >
                      {currentItem.caption}
                    </Typography>
                  )}
                </Typography>
              )
            }
          >
            {items}
          </List>

          {/* group divider */}
          <Activity mode={drawerOpen ? 'visible' : 'hidden'}>
            <Divider sx={{ mt: 0.25, mb: 1.25 }} />
          </Activity>
        </>
      ) : (
        <List>
          <ListItemButton
            selected={isSelected}
            sx={{
              borderRadius: `${borderRadius}px`,
              p: 1,
              my: 0.5,
              mr: 1,
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'inherit'
            }}
            onMouseEnter={handleClick}
            onClick={handleClick}
            onMouseLeave={handleClose}
            aria-describedby={popperId}
            className={anchorEl ? 'Mui-selected' : ''}
          >
            <Activity mode={itemIcon ? 'visible' : 'hidden'}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                {currentItem.id === lastItemId ? <IconMinusVertical stroke={1.5} size="20px" /> : itemIcon}
              </ListItemIcon>
            </Activity>
            <ListItemText
              sx={{ mr: 1, mb: 0.25 }}
              primary={
                <Typography variant={isSelected ? 'h5' : 'body1'} sx={{ color: 'inherit' }}>
                  {currentItem.id === lastItemId ? 'More Items' : currentItem.title || null}
                </Typography>
              }
            />
            {openMini ? <IconChevronDown stroke={1.5} size="16px" /> : <IconChevronRight stroke={1.5} size="16px" />}

            <Activity mode={anchorEl ? 'visible' : 'hidden'}>
              <Popper
                id={popperId}
                open={openMini}
                anchorEl={anchorEl}
                placement="bottom-start"
                sx={{
                  overflow: 'visible',
                  zIndex: 2001,
                  minWidth: 180,
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 5,
                    left: 32,
                    width: 12,
                    height: 12,
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 120,
                    borderWidth: '6px',
                    borderStyle: 'solid',
                    borderTopColor: 'background.paper',
                    borderLeftColor: 'background.paper',
                    borderRightColor: 'transparent',
                    borderBottomColor: 'transparent'
                  }
                }}
              >
                {({ TransitionProps }) => (
                  <Transitions in={openMini} {...TransitionProps}>
                    <Paper
                      sx={{
                        mt: 0.5,
                        py: 1.25,
                        boxShadow: theme.shadows[8],
                        backgroundImage: 'none'
                      }}
                    >
                      <ClickAwayListener onClickAway={handleClose}>
                        <Box
                          sx={{
                            minWidth: 200,
                            maxHeight: 'calc(100vh - 170px)',
                            overflowY: 'auto',
                            '&::-webkit-scrollbar': {
                              opacity: 0,
                              width: 4,
                              '&:hover': {
                                opacity: 0.7
                              }
                            },
                            '&::-webkit-scrollbar-track': {
                              bgcolor: 'transparent'
                            },
                            '&::-webkit-scrollbar-thumb': {
                              bgcolor: 'divider',
                              borderRadius: 4
                            }
                          }}
                        >
                          {currentItem.id !== lastItemId ? items : moreItems}
                        </Box>
                      </ClickAwayListener>
                    </Paper>
                  </Transitions>
                )}
              </Popper>
            </Activity>
          </ListItemButton>
        </List>
      )}
    </>
  );
}

NavGroup.propTypes = {
  item: PropTypes.any,
  lastItem: PropTypes.number,
  remItems: PropTypes.array,
  lastItemId: PropTypes.string,
  selectedID: PropTypes.oneOfType([PropTypes.any, PropTypes.string]),
  setSelectedID: PropTypes.oneOfType([PropTypes.any, PropTypes.string])
};
