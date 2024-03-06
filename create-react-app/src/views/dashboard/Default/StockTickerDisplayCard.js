import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, Typography, Link } from '@mui/material';
import axios from 'axios';
import { gridSpacing } from 'store/constant';

const StockTickerDisplayCard = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get('/api/stocks');
        if (response.data && Array.isArray(response.data)) {
          setStockData(response.data);
        } else {
          setError('Unexpected API response structure');
        }
      } catch (error) {
        console.error('Failed to fetch stock data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Card>
      <CardContent>
        <Grid container spacing={gridSpacing}>
          {/* Column titles */}
          <Grid item xs={6}>
            <Typography variant="h6">Stock Ticker</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">Last Closing Price</Typography>
          </Grid>
          {/* Stock Items */}
          {stockData.map((stock, index) => (
            <React.Fragment key={index}>
              <Grid item xs={6}>
                <Link href={`/stock-details/${stock.symbol}`} target="_blank" style={{ textDecoration: 'none' }}>
                  <Typography variant="subtitle1">{stock.symbol}</Typography>
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">{`$${stock.price.toFixed(2)}`}</Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StockTickerDisplayCard;

