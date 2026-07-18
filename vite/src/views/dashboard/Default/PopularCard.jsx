import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const stockData = [
  { id: 1, company: 'Bajaj Finserv', type: 'Profit', percentage: 10, price: 1839 },
  { id: 2, company: 'TTML', type: 'Loss', percentage: 10, price: 100 },
  { id: 3, company: 'Reliance', type: 'Profit', percentage: 10, price: 200 },
  { id: 4, company: 'TTML', type: 'Loss', percentage: 10, price: 189 },
  { id: 5, company: 'Stolon', type: 'Loss', percentage: 10, price: 189 }
];

export default function PopularCard({ isLoading }) {
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
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Stack sx={{ gap: gridSpacing }}>
              <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4">Popular Stocks</Typography>
                <IconButton size="small" sx={{ mt: -0.625 }}>
                  <MoreHorizOutlinedIcon
                    fontSize="small"
                    sx={{ cursor: 'pointer' }}
                    aria-controls="menu-popular-card"
                    aria-haspopup="true"
                    onClick={handleClick}
                  />
                </IconButton>
              </Stack>
              <Menu
                id="menu-popular-card"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={handleClose}> Today</MenuItem>
                <MenuItem onClick={handleClose}> This Month</MenuItem>
                <MenuItem onClick={handleClose}> This Year </MenuItem>
              </Menu>

              <BajajAreaChartCard />
              <Box>
                {stockData.map((item, index) => (
                  <Box key={item.id}>
                    <Stack direction="row" sx={{ gap: 1, justifyContent: 'space-between', alignItems: 'start' }}>
                      <Box>
                        <Typography variant="subtitle1" sx={{ color: 'inherit' }}>
                          {item.company}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ color: item.type === 'Loss' ? 'error.main' : 'success.main' }}>
                          {item.percentage}% {item.type}
                        </Typography>
                      </Box>
                      <Stack direction="row" sx={{ alignItems: 'center', gap: 2 }}>
                        <Typography variant="subtitle1" sx={{ color: 'inherit' }}>
                          ${item.price.toFixed(2)}
                        </Typography>
                        <Avatar
                          variant="rounded"
                          color={item.type === 'Loss' ? 'error' : 'success'}
                          sx={{ width: 18, height: 18, borderRadius: '5px' }}
                          data-soft
                        >
                          {item.type === 'Loss' ? (
                            <KeyboardArrowDownOutlinedIcon color="inherit" />
                          ) : (
                            <KeyboardArrowUpOutlinedIcon color="inherit" />
                          )}
                        </Avatar>
                      </Stack>
                    </Stack>
                    {index < stockData.length - 1 && <Divider sx={{ my: 1.5 }} />}
                  </Box>
                ))}
              </Box>
            </Stack>
          </CardContent>
          <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
            <Button disableElevation>
              View All
              <ChevronRightOutlinedIcon />
            </Button>
          </CardActions>
        </MainCard>
      )}
    </>
  );
}

PopularCard.propTypes = { isLoading: PropTypes.bool };
