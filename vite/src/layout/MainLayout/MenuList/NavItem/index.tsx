import { useEffect, useRef, useState } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// project imports
import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';
import { MenuOrientation, ThemeDirection, ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';

// third party
import { FormattedMessage } from 'react-intl';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// types
import { LinkTarget, NavItemType } from 'types';

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

interface NavItemProps {
  item: NavItemType;
  level: number;
  isParents?: boolean;
  setSelectedID?: () => void;
}

export default function NavItem({ item, level, isParents = false, setSelectedID }: NavItemProps) {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const ref = useRef<HTMLSpanElement>(null);

  const { pathname } = useLocation();
  const { mode, menuOrientation, borderRadius, themeDirection } = useConfig();

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downMD;
  const isSelected = !!matchPath({ path: item?.link ? item.link : item.url!, end: false }, pathname);

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

  const Icon = item?.icon!;
  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} size={drawerOpen ? '20px' : '24px'} style={{ ...(isHorizontal && isParents && { fontSize: 20, stroke: '1.5' }) }} />
  ) : (
    <FiberManualRecordIcon sx={{ width: isSelected ? 8 : 6, height: isSelected ? 8 : 6 }} fontSize={level > 0 ? 'inherit' : 'medium'} />
  );

  let itemTarget: LinkTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  const itemHandler = () => {
    if (downMD) handlerDrawerOpen(false);

    if (isParents && setSelectedID) {
      setSelectedID();
    }
  };

  const iconSelectedColor = mode === ThemeMode.DARK && drawerOpen ? 'text.primary' : 'secondary.main';

  return (
    <>
      {!isHorizontal ? (
        <ListItemButton
          component={Link}
          to={item.url!}
          target={itemTarget}
          disabled={item.disabled}
          disableRipple={!drawerOpen}
          sx={{
            zIndex: 1201,
            borderRadius: `${borderRadius}px`,
            mb: 0.5,
            ...(drawerOpen && level !== 1 && { ml: `${level * 18}px` }),
            ...(!drawerOpen && { pl: 1.25 }),
            ...(drawerOpen &&
              level === 1 &&
              mode !== ThemeMode.DARK && {
                '&:hover': {
                  bgcolor: 'secondary.light'
                },
                '&.Mui-selected': {
                  bgcolor: 'secondary.light',
                  color: iconSelectedColor,
                  '&:hover': {
                    color: iconSelectedColor,
                    bgcolor: 'secondary.light'
                  }
                }
              }),
            ...((!drawerOpen || level !== 1) && {
              py: level === 1 ? 0 : 1,
              '&:hover': {
                bgcolor: 'transparent'
              },
              '&.Mui-selected': {
                '&:hover': {
                  bgcolor: 'transparent'
                },
                bgcolor: 'transparent'
              }
            })
          }}
          selected={isSelected}
          onClick={() => itemHandler()}
        >
          <ButtonBase aria-label="theme-icon" sx={{ borderRadius: `${borderRadius}px` }} disableRipple={drawerOpen}>
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
                    ...(isSelected && {
                      bgcolor: mode === ThemeMode.DARK ? alpha(theme.palette.secondary.main, 0.25) : 'secondary.light',
                      '&:hover': {
                        bgcolor: mode === ThemeMode.DARK ? alpha(theme.palette.secondary.main, 0.3) : 'secondary.light'
                      }
                    })
                  })
              }}
            >
              {itemIcon}
            </ListItemIcon>
          </ButtonBase>

          {(drawerOpen || (!drawerOpen && level !== 1)) && (
            <Tooltip title={<FormattedMessage id={item.title} />} disableHoverListener={!hoverStatus}>
              <ListItemText
                primary={
                  <Typography
                    ref={ref}
                    noWrap
                    variant={isSelected ? 'h5' : 'body1'}
                    color="inherit"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      width: 102,
                      ...(themeDirection === ThemeDirection.RTL && { textAlign: 'end', direction: 'rtl' })
                    }}
                  >
                    <FormattedMessage id={item.title} />
                  </Typography>
                }
                secondary={
                  item.caption && (
                    <Typography variant="caption" gutterBottom sx={{ display: 'block', ...theme.typography.subMenuCaption }}>
                      <FormattedMessage id={item.caption} />
                    </Typography>
                  )
                }
              />
            </Tooltip>
          )}

          {drawerOpen && item.chip && (
            <Chip
              color={item.chip.color}
              variant={item.chip.variant}
              size={item.chip.size}
              label={item.chip.label}
              avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
            />
          )}
        </ListItemButton>
      ) : (
        <ListItemButton
          component={Link}
          to={item.url!}
          target={itemTarget}
          disabled={item.disabled}
          sx={{
            borderRadius: isParents ? `${borderRadius}px` : 0,
            mb: isParents ? 0 : 0.5,
            alignItems: 'flex-start',
            backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
            py: 1,
            pl: 2,
            mr: isParents ? 1 : 0
          }}
          selected={isSelected}
          onClick={() => itemHandler()}
        >
          <ListItemIcon
            sx={{
              my: 'auto',
              minWidth: !item?.icon ? 18 : 36
            }}
          >
            {itemIcon}
          </ListItemIcon>

          <ListItemText
            sx={{ mb: 0.25 }}
            primary={
              <Typography variant={isSelected ? 'h5' : 'body1'} color="inherit">
                <FormattedMessage id={item.title} />
              </Typography>
            }
            secondary={
              item.caption && (
                <Typography variant="caption" gutterBottom sx={{ display: 'block', ...theme.typography.subMenuCaption }}>
                  {item.caption}
                </Typography>
              )
            }
          />

          {item.chip && (
            <Chip
              color={item.chip.color}
              variant={item.chip.variant}
              size={item.chip.size}
              label={item.chip.label}
              avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
            />
          )}
        </ListItemButton>
      )}
    </>
  );
}
