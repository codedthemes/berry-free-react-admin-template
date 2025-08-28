import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

// material-ui
import { alpha, styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import NavItem from '../NavItem';
import Transitions from 'ui-component/extended/Transitions';

import { useGetMenuMaster } from 'api/menu';
import { MenuOrientation, ThemeDirection, ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';
import useMenuCollapse from 'hooks/useMenuCollapse';

// third party
import { FormattedMessage } from 'react-intl';

// assets
import { IconChevronDown, IconChevronRight, IconChevronUp } from '@tabler/icons-react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// types
import { NavItemType } from 'types';

// horizontal-menu - wrapper
const PopperStyled = styled(Popper)(({ theme }) => ({
  overflow: 'visible',
  zIndex: 1202,
  minWidth: 180,
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 34,
    left: -5,
    width: 12,
    height: 12,
    transform: 'translateY(-50%) rotate(45deg)',
    zIndex: 120,
    borderWidth: '6px',
    borderStyle: 'solid',
    borderColor: `transparent transparent ${theme.palette.background.paper}  ${theme.palette.background.paper}`
  },
  '&[data-popper-placement="left-start"]:before': {
    left: 'auto',
    right: -5,
    borderColor: `${theme.palette.background.paper}  ${theme.palette.background.paper} transparent transparent`
  },
  '&[data-popper-placement="left-end"]:before': {
    top: 'auto',
    bottom: 15,
    left: 'auto',
    right: -5,
    borderColor: `${theme.palette.background.paper}  ${theme.palette.background.paper} transparent transparent`
  },
  '&[data-popper-placement="right-end"]:before': {
    top: 'auto',
    bottom: 15
  }
}));

// ==============================|| SIDEBAR MENU LIST COLLAPSE ITEMS ||============================== //

type VirtualElement = {
  getBoundingClientRect: () => DOMRectReadOnly | DOMRect;
  contextElement?: Element;
};

interface NavCollapseProps {
  menu: NavItemType;
  level: number;
  parentId: string;
}

export default function NavCollapse({ menu, level, parentId }: NavCollapseProps) {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const ref = useRef<HTMLSpanElement>(null);

  const { mode, menuOrientation, borderRadius, themeDirection } = useConfig();
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downMD;

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null | undefined>(null);
  const [anchorEl, setAnchorEl] = useState<VirtualElement | (() => VirtualElement) | null | undefined>(null);

  const handleClickMini = (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement, MouseEvent> | undefined) => {
    setAnchorEl(null);
    if (drawerOpen) {
      setOpen(!open);
      setSelected(!selected ? menu.id : null);
    } else {
      setAnchorEl(event?.currentTarget);
    }
  };

  const handleHover = (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement, MouseEvent> | undefined) => {
    setAnchorEl(event?.currentTarget);
  };

  const openMini = Boolean(anchorEl);

  const handleMiniClose = () => {
    setAnchorEl(null);
  };

  const handleClosePopper = () => {
    setOpen(false);
    if (!openMini) {
      if (!menu.url) {
        setSelected(null);
      }
    }
    setAnchorEl(null);
  };

  const { pathname } = useLocation();

  // menu collapse for sub-levels
  useMenuCollapse(menu, pathname, openMini, setSelected, setOpen, setAnchorEl);

  const [hoverStatus, setHover] = useState<boolean>(false);

  const compareSize = () => {
    const compare = ref.current && ref.current.scrollWidth > ref.current.clientWidth;
    setHover(compare as boolean);
  };

  useEffect(() => {
    compareSize();
    window.addEventListener('resize', compareSize);
    window.removeEventListener('resize', compareSize);
  }, []);

  useEffect(() => {
    if (menu.url === pathname) {
      setSelected(menu.id);
      setAnchorEl(null);
      setOpen(true);
    }
  }, [pathname, menu]);

  // menu collapse & item
  const menus = menu.children?.map((item) => {
    switch (item.type) {
      case 'collapse':
        return <NavCollapse key={item.id} menu={item} level={level + 1} parentId={parentId} />;
      case 'item':
        return <NavItem key={item.id} item={item} level={level + 1} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  const isSelected = selected === menu.id;

  const Icon = menu.icon!;
  const menuIcon = menu.icon ? (
    <Icon strokeWidth={1.5} size={drawerOpen ? '20px' : '24px'} />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: isSelected ? 8 : 6,
        height: isSelected ? 8 : 6
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  const collapseIcon = drawerOpen ? (
    <IconChevronUp stroke={1.5} size="16px" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
  ) : (
    <IconChevronRight stroke={1.5} size="16px" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
  );

  const iconSelectedColor = mode === ThemeMode.DARK && drawerOpen ? 'text.primary' : 'secondary.main';
  const popperId = openMini ? `collapse-pop-${menu.id}` : undefined;

  return (
    <>
      {!isHorizontal ? (
        <>
          <ListItemButton
            sx={{
              zIndex: 1201,
              borderRadius: `${borderRadius}px`,
              mb: 0.5,
              ...(drawerOpen && level !== 1 && { ml: `${level * 18}px` }),
              ...(!drawerOpen && { pl: 1.25 }),
              ...(drawerOpen &&
                level === 1 &&
                mode !== ThemeMode.DARK && {
                  '&:hover': { bgcolor: 'secondary.light' },
                  '&.Mui-selected': {
                    bgcolor: 'secondary.light',
                    color: iconSelectedColor,
                    '&:hover': { color: iconSelectedColor, bgcolor: '.secondary.light' }
                  }
                }),
              ...((!drawerOpen || level !== 1) && {
                py: level === 1 ? 0 : 1,
                '&:hover': { bgcolor: 'transparent' },
                '&.Mui-selected': { '&:hover': { bgcolor: 'transparent' }, bgcolor: 'transparent' }
              })
            }}
            selected={isSelected}
            {...(!drawerOpen && { onMouseEnter: handleClickMini, onMouseLeave: handleMiniClose })}
            className={anchorEl ? 'Mui-selected' : ''}
            onClick={handleClickMini}
          >
            {menuIcon && (
              <ListItemIcon
                sx={{
                  minWidth: level === 1 ? 36 : 18,
                  color: isSelected ? iconSelectedColor : 'text.primary',
                  ...(!drawerOpen &&
                    level === 1 && {
                      borderRadius: `${borderRadius}px`,
                      width: 46,
                      height: 46,
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&:hover': {
                        bgcolor: mode === ThemeMode.DARK ? alpha(theme.palette.secondary.main, 0.25) : 'secondary.light'
                      },
                      ...((isSelected || anchorEl) && {
                        bgcolor: mode === ThemeMode.DARK ? alpha(theme.palette.secondary.main, 0.25) : 'secondary.light',
                        '&:hover': {
                          bgcolor: mode === ThemeMode.DARK ? alpha(theme.palette.secondary.main, 0.3) : 'secondary.light'
                        }
                      })
                    })
                }}
              >
                {menuIcon}
              </ListItemIcon>
            )}
            {(drawerOpen || (!drawerOpen && level !== 1)) && (
              <Tooltip title={<FormattedMessage id={menu.title} />} disableHoverListener={!hoverStatus}>
                <ListItemText
                  primary={
                    <Typography
                      ref={ref}
                      noWrap
                      variant={isSelected || anchorEl ? 'h5' : 'body1'}
                      color="inherit"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        width: 120,
                        ...(themeDirection === ThemeDirection.RTL && { textAlign: 'end', direction: 'rtl' })
                      }}
                    >
                      <FormattedMessage id={menu.title} />
                    </Typography>
                  }
                  secondary={
                    menu.caption && (
                      <Typography variant="caption" gutterBottom sx={{ display: 'block', ...theme.typography.subMenuCaption }}>
                        <FormattedMessage id={menu.caption} />
                      </Typography>
                    )
                  }
                />
              </Tooltip>
            )}

            {openMini || open ? (
              collapseIcon
            ) : (
              <IconChevronDown stroke={1.5} size="16px" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
            )}

            {!drawerOpen && (
              <Popper
                open={openMini}
                anchorEl={anchorEl}
                placement="right-start"
                modifiers={[
                  {
                    name: 'offset',
                    options: {
                      offset: [-12, 0]
                    }
                  }
                ]}
                sx={{
                  overflow: 'visible',
                  zIndex: 2001,
                  minWidth: 180,
                  '&:before': {
                    content: '""',
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 120,
                    borderLeft: `1px solid`,
                    borderBottom: `1px solid`,
                    borderColor: 'divider'
                  }
                }}
              >
                {({ TransitionProps }) => (
                  <Transitions in={openMini} {...TransitionProps}>
                    <Paper
                      sx={{
                        overflow: 'hidden',
                        boxShadow: theme.shadows[8],
                        backgroundImage: 'none'
                      }}
                    >
                      <ClickAwayListener onClickAway={handleClosePopper}>
                        <Box>{menus}</Box>
                      </ClickAwayListener>
                    </Paper>
                  </Transitions>
                )}
              </Popper>
            )}
          </ListItemButton>
          {drawerOpen && (
            <Collapse in={open} timeout="auto" unmountOnExit>
              {open && (
                <List
                  disablePadding
                  sx={{
                    position: 'relative',
                    '&:after': {
                      content: "''",
                      position: 'absolute',
                      left: '25px',
                      top: 0,
                      height: '100%',
                      width: '1px',
                      opacity: mode === ThemeMode.DARK ? 0.2 : 1,
                      bgcolor: mode === ThemeMode.DARK ? 'dark.light' : 'primary.light'
                    }
                  }}
                >
                  {menus}
                </List>
              )}
            </Collapse>
          )}
        </>
      ) : (
        <ListItemButton
          id={`boundary-${popperId}`}
          disableRipple
          selected={isSelected}
          onMouseEnter={handleHover}
          onMouseLeave={handleClosePopper}
          onClick={handleHover}
          aria-describedby={popperId}
          className={anchorEl ? 'Mui-selected' : ''}
        >
          {menuIcon && <ListItemIcon sx={{ my: 'auto', minWidth: !menu.icon ? 18 : 36 }}>{menuIcon}</ListItemIcon>}
          <ListItemText
            sx={{ mb: 0.25 }}
            primary={
              <Typography variant={isSelected ? 'h5' : 'body1'} color="inherit" sx={{ my: 'auto' }}>
                <FormattedMessage id={menu.title} />
              </Typography>
            }
          />
          {openMini ? <IconChevronRight stroke={1.5} size="16px" /> : <IconChevronDown stroke={1.5} size="16px" />}

          {anchorEl && (
            <PopperStyled
              id={popperId}
              open={openMini}
              anchorEl={anchorEl}
              placement="right-start"
              style={{
                zIndex: 2001
              }}
              modifiers={[
                {
                  name: 'offset',
                  options: {
                    offset: [-10, 0]
                  }
                }
              ]}
            >
              {({ TransitionProps }) => (
                <Transitions in={openMini} {...TransitionProps}>
                  <Paper
                    sx={{
                      overflow: 'hidden',
                      mt: 1.5,
                      py: 0.5,
                      boxShadow: theme.shadows[8],
                      backgroundImage: 'none'
                    }}
                  >
                    <ClickAwayListener onClickAway={handleClosePopper}>
                      <Box>{menus}</Box>
                    </ClickAwayListener>
                  </Paper>
                </Transitions>
              )}
            </PopperStyled>
          )}
        </ListItemButton>
      )}
    </>
  );
}
