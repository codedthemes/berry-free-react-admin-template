import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import EarningIcon from 'assets/images/icons/earning.svg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import GetAppTwoToneIcon from '@mui/icons-material/GetAppOutlined';
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveOutlined';

export default function EarningCard({ isLoading }) {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <MainCard
          border={false}
          content={false}
          sx={{
            bgcolor: 'secondary.dark',
            color: '#fff',
            overflow: 'hidden',
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              width: 210,
              height: 210,
              bgcolor: theme.vars.palette.secondary.darker,
              borderRadius: '50%',
              top: { xs: -85 },
              right: { xs: -95 }
            },
            '&:before': {
              content: '""',
              position: 'absolute',
              width: 210,
              height: 210,
              bgcolor: theme.vars.palette.secondary.darker,
              borderRadius: '50%',
              top: { xs: -125 },
              right: { xs: -15 },
              opacity: 0.5
            }
          }}
        >
          <Box sx={{ p: 2.25 }}>
            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
              <Avatar
                variant="rounded"
                sx={{
                  bgcolor: 'secondary.darker',
                  mt: 1
                }}
              >
                <CardMedia sx={{ width: 28, height: 28 }} component="img" src={EarningIcon} alt="Notification" />
              </Avatar>
              <Avatar
                variant="rounded"
                sx={{
                  bgcolor: 'secondary.dark',
                  color: 'secondary.light',
                  zIndex: 1,
                  cursor: 'pointer'
                }}
                aria-controls="menu-earning-card"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreHorizIcon />
              </Avatar>
            </Stack>
            <Menu
              id="menu-earning-card"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              <MenuItem onClick={handleClose}>
                <GetAppTwoToneIcon sx={{ mr: 1.75 }} /> Import Card
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <FileCopyTwoToneIcon sx={{ mr: 1.75 }} /> Copy Data
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <PictureAsPdfTwoToneIcon sx={{ mr: 1.75 }} /> Export
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ArchiveTwoToneIcon sx={{ mr: 1.75 }} /> Archive File
              </MenuItem>
            </Menu>
            <Stack direction="row" sx={{ alignItems: 'center' }}>
              <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>$500.00</Typography>
              <Avatar sx={{ width: 22, height: 22, bgcolor: 'secondary.light', color: 'secondary.darker', svg: { width: 16, height: 16 } }}>
                <ArrowUpwardIcon sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
              </Avatar>
            </Stack>
            <Typography
              sx={{
                mb: 1.25,
                fontSize: '1rem',
                fontWeight: 500,
                color: 'secondary.light'
              }}
            >
              Total Earning
            </Typography>
          </Box>
        </MainCard>
      )}
    </>
  );
}

EarningCard.propTypes = { isLoading: PropTypes.bool };
