import PropTypes from 'prop-types';
import React, { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third party
import Chart from 'react-apexcharts';

// project imports
import chartOptions from './chart-data/total-order-line-chart';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// data
const monthlyData = [{ data: [45, 66, 41, 89, 25, 44, 9, 54] }];
const yearlyData = [{ data: [35, 44, 9, 54, 45, 66, 41, 69] }];

export default function TotalOrderLineChartCard({ isLoading }) {
  const theme = useTheme();

  const [timeValue, setTimeValue] = React.useState(false);
  const [series, setSeries] = useState(yearlyData);

  const handleChangeTime = (_event, newValue) => {
    setTimeValue(newValue);
    if (newValue) {
      setSeries(monthlyData);
    } else {
      setSeries(yearlyData);
    }
  };

  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <MainCard
          border={false}
          content={false}
          sx={{
            bgcolor: 'primary.dark',
            color: '#fff',
            overflow: 'hidden',
            position: 'relative',
            '&>div': {
              position: 'relative',
              zIndex: 5
            },
            '&:after': {
              content: '""',
              position: 'absolute',
              width: 210,
              height: 210,
              background: theme.vars.palette.primary[800],
              borderRadius: '50%',
              top: { xs: -85 },
              right: { xs: -95 }
            },
            '&:before': {
              content: '""',
              position: 'absolute',
              width: 210,
              height: 210,
              background: theme.vars.palette.primary[800],
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
                  ...theme.typography.largeAvatar,
                  borderRadius: 2,
                  bgcolor: 'primary.800',
                  color: 'common.white',
                  mt: 1
                }}
              >
                <LocalMallOutlinedIcon fontSize="inherit" />
              </Avatar>
              <Box>
                <Button
                  disableElevation
                  variant={timeValue ? 'contained' : 'text'}
                  size="small"
                  sx={{ color: 'inherit' }}
                  onClick={(e) => handleChangeTime(e, true)}
                >
                  Month
                </Button>
                <Button
                  disableElevation
                  variant={!timeValue ? 'contained' : 'text'}
                  size="small"
                  sx={{ color: 'inherit' }}
                  onClick={(e) => handleChangeTime(e, false)}
                >
                  Year
                </Button>
              </Box>
            </Stack>

            <Grid sx={{ mb: 0.75 }}>
              <Grid container sx={{ alignItems: 'center' }}>
                <Grid size={6}>
                  <Box>
                    <Stack direction="row" sx={{ alignItems: 'center' }}>
                      <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                        {timeValue ? '$108' : '$961'}
                      </Typography>
                      <Avatar sx={{ ...theme.typography.smallAvatar, bgcolor: 'primary.200', color: 'primary.dark' }}>
                        <ArrowDownwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                      </Avatar>
                    </Stack>
                    <Typography
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: 'primary.200'
                      }}
                    >
                      Total Order
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  size={6}
                  sx={{
                    '.apexcharts-tooltip.apexcharts-theme-light': {
                      color: theme.vars.palette.text.primary,
                      background: theme.vars.palette.background.default
                    }
                  }}
                >
                  <Chart options={chartOptions} series={series} type="line" height={90} />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </MainCard>
      )}
    </>
  );
}

TotalOrderLineChartCard.propTypes = { isLoading: PropTypes.bool };
