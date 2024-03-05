import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import axios from 'axios';
import TotalPortfolioValueCard from './TotalPortfolioValueCard';
import ROICard from './ROICard';
import LineGraph from './LineGraph';
import StockTickerDisplayCard from './StockTickerDisplayCard';

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioSummary, setPortfolioSummary] = useState({ total_portfolio_value: 0, roi: 0 });
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    // Fetch the portfolio summary data including total value and ROI
    const fetchPortfolioSummary = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/portfolio');
        if (response.status === 200) {
          setPortfolioSummary({
            total_portfolio_value: response.data.total_portfolio_value,
            roi: response.data.roi
          });
          // Assuming stock data is also returned from the /api/portfolio endpoint
          // Adjust accordingly if it's fetched from a different endpoint
          setStockData(response.data.stocks);
        } else {
          console.error('Failed to fetch data: ', response);
        }
      } catch (error) {
        console.error('Error fetching portfolio summary: ', error);
      }
      setIsLoading(false);
    };

    fetchPortfolioSummary();
  }, []);

  return (
    <Grid container spacing={3}>
      {/* Total Portfolio Value Card */}
      <Grid item xs={12} sm={6}>
        <TotalPortfolioValueCard isLoading={isLoading} totalPortfolioValue={portfolioSummary.total_portfolio_value} />
      </Grid>

      {/* ROI Card */}
      <Grid item xs={12} sm={6}>
        <ROICard isLoading={isLoading} roi={portfolioSummary.roi} />
      </Grid>

      {/* Line Graph */}
      <Grid item xs={12}>
        <LineGraph />
      </Grid>

      {/* Stock Ticker Display Card */}
      <Grid item xs={12}>
        <StockTickerDisplayCard stockData={stockData} />
      </Grid>
    </Grid>
  );
};

export default LandingPage;
