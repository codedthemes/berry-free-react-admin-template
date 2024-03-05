import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, Typography, Link } from '@mui/material';
import axios from 'axios';
import { gridSpacing } from 'store/constant';

// ==============================|| STOCK TICKER DISPLAY CARD ||============================== //

const StockTickerDisplayCard = () => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        // Update the URL and parameters as needed to match your backend API
        const response = await axios.get('/api/stocks');
        setStockData(response.data.stocks);
      } catch (error) {
        console.error('Failed to fetch stock data:', error);
        // Handle errors or set some default state as needed
      }
    };

    fetchStockData();
  }, []);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={gridSpacing}>
          {/* Header for the card */}
          <Grid item xs={12}>
            <Typography variant="h4">Stock Details</Typography>
          </Grid>
          {/* Stock Items */}
          {stockData.map((stock, index) => (
            <Grid item xs={12} key={index}>
              <Grid container alignItems="center" justifyContent="space-between">
                {/* Ticker Symbol */}
                <Grid item>
                  <Typography variant="subtitle1">{stock.symbol}</Typography>
                </Grid>
                {/* Last Closing Price */}
                <Grid item>
                  <Typography variant="subtitle1">{`$${stock.price.toFixed(2)}`}</Typography>
                </Grid>
                {/* Placeholder for link to stock's detail page */}
                <Grid item>
                  <Link href="#" onClick={(e) => e.preventDefault()}>
                    View Details
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StockTickerDisplayCard;

