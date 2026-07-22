'use client';
import PropTypes from 'prop-types';

import { Activity, useEffect, useRef, useState } from 'react';

// next
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// project imports
import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';
import useConfig from 'hooks/useConfig';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export default function NavItem({ item, level, isParents = false, setSelectedID }) {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const ref = useRef(null);

  const pathname = usePathname();
  const {
    state: { borderRadius }
  } = useConfig();

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const isHorizontal = false;
  const isSelected = pathname === item.url;

  const [hoverStatus, setHover] = useState(false);

  const compareSize = () => {
    const compare = ref.current && ref.current.scrollWidth > ref.current.clientWidth;
    setHover(compare);
  };

  useEffect(() => {
    compareSize();
    window.addEventListener('resize', compareSize);
    window.removeEventListener('resize', compareSize);
  }, []);

  const Icon = item?.icon;
  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} size={drawerOpen ? '20px' : '24px'} style={{ ...(isHorizontal && isParents && { fontSize: 20, stroke: '1.5' }) }} />
  ) : (
    <FiberManualRecordIcon sx={{ width: isSelected ? 8 : 6, height: isSelected ? 8 : 6 }} fontSize={level > 0 ? 'inherit' : 'medium'} />
  );

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  const itemHandler = () => {
    if (downMD) handlerDrawerOpen(false);

    if (isParents && setSelectedID) {
      setSelectedID();
    }
  };

  return (
    <>
      {!isHorizontal ? (
        <ListItemButton
          component={Link}
          href={item.url}
          target={itemTarget}
          disabled={item.disabled}
          disableRipple={!drawerOpen}
          sx={{
            zIndex: 1201,
            borderRadius: `${borderRadius}px`,
            mb: 0.5,
            ...(drawerOpen && level !== 1 && { ml: `${level * 18}px` }),
            ...(!drawerOpen && { pl: 1.25 }),
            ...((!drawerOpen || level !== 1) && {
              py: level === 1 ? 0 : 1,
              '&:hover': { bgcolor: 'transparent' },
              '&.Mui-selected': {
                '&:hover': { bgcolor: 'transparent' },
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
                color: isSelected ? 'secondary.main' : 'text.primary',
                ...(!drawerOpen &&
                  level === 1 && {
                    borderRadius: `${borderRadius}px`,
                    width: 46,
                    height: 46,
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': { bgcolor: 'secondary.lighter' },
                    ...(isSelected && {
                      bgcolor: 'secondary.lighter',
                      '&:hover': { bgcolor: 'secondary.lighter' }
                    })
                  })
              }}
            >
              {itemIcon}
            </ListItemIcon>
          </ButtonBase>

          {(drawerOpen || (!drawerOpen && level !== 1)) && (
            <Tooltip title={item.title} disableHoverListener={!hoverStatus}>
              <ListItemText
                primary={
                  <Typography
                    ref={ref}
                    noWrap
                    variant={isSelected ? 'h5' : 'body1'}
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      width: 102,
                      color: 'inherit'
                    }}
                  >
                    {item.title}
                  </Typography>
                }
                secondary={
                  item.caption && (
                    <Typography
                      variant="caption"
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
                      {item.caption}
                    </Typography>
                  )
                }
              />
            </Tooltip>
          )}

          <Activity mode={drawerOpen && item.chip ? 'visible' : 'hidden'}>
            <Chip
              variant={item.chip?.variant}
              label={item.chip?.label}
              color={item.chip?.color}
              size={item.chip?.size}
              avatar={item.chip?.avatar}
            />
          </Activity>
        </ListItemButton>
      ) : (
        <ListItemButton
          component={Link}
          href={item.url}
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
              <Typography variant={isSelected ? 'h5' : 'body1'} sx={{ color: 'inherit' }}>
                {item.title}
              </Typography>
            }
            secondary={
              <Activity mode={item.caption ? 'visible' : 'hidden'}>
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
                  {item.caption}
                </Typography>
              </Activity>
            }
          />

          <Activity mode={item.chip ? 'visible' : 'hidden'}>
            <Chip
              color={item.chip?.color}
              variant={item.chip?.variant}
              size={item.chip?.size}
              label={item.chip?.label}
              avatar={item.chip?.avatar}
            />
          </Activity>
        </ListItemButton>
      )}
    </>
  );
}

NavItem.propTypes = { item: PropTypes.any, level: PropTypes.number, isParents: PropTypes.bool, setSelectedID: PropTypes.func };
