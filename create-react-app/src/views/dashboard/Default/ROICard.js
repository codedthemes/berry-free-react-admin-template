import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';

// third-party
import Chart from 'react-apexcharts';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';

import ChartDataMonth from './chart-data/total-order-month-line-chart';
import ChartDataYear from './chart-data/total-order-year-line-chart';

// assets
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
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
    background: theme.palette.primary[800],
    borderRadius: '50%',
    zIndex: 1,
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    zIndex: 1,
    width: 210,
    height: 210,
    background: theme.palette.primary[800],
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));


//// 

const ROICard = ({ isLoading }) => {
    const theme = useTheme();
    const [roi, setRoi] = useState(0);
  
    // Fetch ROI from backend on component mount
    useEffect(() => {
      const fetchROI = async () => {
        try {
          // Adjust this URL to your actual endpoint
          const response = await axios.get('/api/portfolio');
          const data = response.data;
          // Assume the backend response contains an "roi" field
          setRoi(data.roi);
        } catch (error) {
          console.error("Failed to fetch ROI:", error);
        }
      };
  
      if (!isLoading) {
        fetchROI();
      }
    }, [isLoading]);
  
    return (
      <CardWrapper border={false} content={false}>
        <Box sx={{ p: 2.25 }}>
          <Grid container direction="column">
            <Grid item>
              <Avatar
                variant="rounded"
                sx={{
                  ...theme.typography.commonAvatar,
                  ...theme.typography.largeAvatar,
                  backgroundColor: theme.palette.primary[800],
                  color: '#fff',
                  mt: 1
                }}
              >
                <LocalMallOutlinedIcon fontSize="inherit" />
              </Avatar>
            </Grid>
            <Grid item sx={{ mb: 0.75 }}>
              <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mt: 1.75, mb: 0.75 }}>
                ROI: {isLoading ? "Loading..." : `${roi.toFixed(2)}%`}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardWrapper>
    );
  };
  
  ROICard.propTypes = {
    isLoading: PropTypes.bool,
  };
  
  export default ROICard;