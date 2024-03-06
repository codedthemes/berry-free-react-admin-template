import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import { gridSpacing } from 'store/constant';

const StockPriceHistoryCard = ({ symbol }) => {
  const [closingPrices, setClosingPrices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClosingPrices = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await axios.get(`/api/stock-details/${encodeURIComponent(symbol)}`);
        if (response.status === 200) {
          setClosingPrices(response.data.closing_prices);
        } else {
          setError('Failed to fetch closing prices');
        }
      } catch (error) {
        console.error('Error fetching closing prices:', error);
        setError('Error fetching closing prices');
      } finally {
        setIsLoading(false);
      }
    };

    fetchClosingPrices();
  }, [symbol]);

  return (
    <Card>
      <CardContent>
        {isLoading ? (
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Typography variant="h4">Price History for {symbol}</Typography>
            </Grid>
            {closingPrices.map((priceData, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="subtitle1">{priceData.date}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">{`$${priceData.price.toFixed(2)}`}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default StockPriceHistoryCard;
