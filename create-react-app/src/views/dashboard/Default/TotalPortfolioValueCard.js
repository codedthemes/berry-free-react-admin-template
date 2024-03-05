import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import GetAppTwoToneIcon from '@mui/icons-material/GetAppOutlined';
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveOutlined';
import EarningIcon from 'assets/images/icons/earning.svg';
import axios from 'axios'; // Assuming axios is installed for API requests

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
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
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
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

const TotalPortfolioValueCard = ({ isLoading }) => {
    const theme = useTheme();
    const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        const fetchTotalPortfolioValue = async () => {
            try {
                // Replace the URL with your actual endpoint URL
                const response = await axios.get('/api/portfolio/total-value');
                setTotalPortfolioValue(response.data.totalPortfolioValue);
            } catch (error) {
                console.error("Error fetching total portfolio value:", error);
            }
        };

        fetchTotalPortfolioValue();
    }, []);

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
                <CardWrapper border={false} content={false}>
                    {/* Card content here, including the totalPortfolioValue variable */}
                    {/* Example usage: */}
                    <Box sx={{ p: 2.25 }}>
                        {/* Card content like avatar, title, and amount */}
                        <Grid container direction="column">
                            {/* Avatar and actions */}
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography.commonAvatar,
                                                ...theme.typography.largeAvatar,
                                                backgroundColor: theme.palette.secondary[800],
                                                mt: 1
                                            }}
                                        >
                                            <img src={EarningIcon} alt="Total Portfolio Value" />
                                        </Avatar>
                                    </Grid>
                                    {/* Other elements like MoreHorizIcon and Menu */}
                                </Grid>
                            </Grid>
                            {/* Total Portfolio Value */}
                            <Grid item>
                                <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mt: 1.75, mb: 0.75 }}>
                                    ${totalPortfolioValue.toLocaleString()}
                                </Typography>
                            </Grid>
                            {/* Subtitle */}
                            <Grid item>
                                <Typography
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        color: theme.palette.secondary[200]
                                    }}
                                >
                                    Total Portfolio Value
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

TotalPortfolioValueCard.propTypes = {
    isLoading: PropTypes.bool,
};

export default TotalPortfolioValueCard;