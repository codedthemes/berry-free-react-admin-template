import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard'; // Adjust the import path as necessary
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard'; // Adjust the import path as necessary
import axios from 'axios'; // Assuming axios is installed for API requests
import EarningIcon from 'assets/images/icons/earning.svg'; // Adjust the import path as necessary


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



const StockTotalValueCard = ({ symbol, isLoading }) => {
    const theme = useTheme();
    const [stockDetails, setStockDetails] = useState({
        totalAmount: 0,
        currentValue: 0,
    });

    useEffect(() => {
        const fetchStockDetails = async () => {
            try {
                const response = await axios.get(`/api/stock-details/${symbol}`);
                if (response.status === 200) {
                    const { total_amount, current_value } = response.data;
                    setStockDetails({ totalAmount: total_amount, currentValue: current_value });
                } else {
                    console.error('Failed to fetch stock details: ', response);
                }
            } catch (error) {
                console.error('Error fetching stock details: ', error);
            }
        };

        if (!isLoading) {
            fetchStockDetails();
        }
    }, [symbol, isLoading]);

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Avatar
                                    variant="rounded"
                                    sx={{
                                        ...theme.typography.commonAvatar,
                                        ...theme.typography.largeAvatar,
                                        backgroundColor: theme.palette.secondary[800],
                                        mt: 1,
                                    }}
                                >
                                    <img src={EarningIcon} alt="Stock" />
                                </Avatar>
                            </Grid>
                            <Grid item>
                                <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mt: 1.75, mb: 0.75 }}>
                                    {symbol}: {stockDetails.totalAmount} shares
                                </Typography>
                                <Typography sx={{ fontSize: '1.5rem', fontWeight: 500 }}>
                                    Current Value: ${stockDetails.currentValue.toLocaleString()}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

StockTotalValueCard.propTypes = {
    symbol: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
};

export default StockTotalValueCard;