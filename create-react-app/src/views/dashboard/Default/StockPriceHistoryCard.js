import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { gridSpacing } from 'store/constant';

// ==============================|| STOCK PRICE HISTORY CARD ||============================== //

const StockPriceHistoryCard = ({ symbol }) => {
  const [closingPrices, setClosingPrices] = useState([]);

  useEffect(() => {
    const fetchClosingPrices = async () => {
      try {
        // Adjust the URL to target the specific stock's endpoint
        const response = await axios.get(`/api/stock-details/${symbol}`);
        if(response.status === 200) {
          // Assuming the response includes a 'closing_prices' field with an array of { date, price } objects
          setClosingPrices(response.data.closing_prices);
        } else {
          console.error('Failed to fetch closing prices:', response);
        }
      } catch (error) {
        console.error('Error fetching closing prices:', error);
      }
    };

    fetchClosingPrices();
  }, [symbol]);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={gridSpacing}>
          {/* Header for the card */}
          <Grid item xs={12}>
            <Typography variant="h4">Price History for {symbol}</Typography>
          </Grid>
          {/* Closing Prices for the last 12 months */}
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
      </CardContent>
    </Card>
  );
};

export default StockPriceHistoryCard;
