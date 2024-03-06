import React from 'react';
import { Grid, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import StockTotalValueCard from '../dashboard/Default/StockTotalValueCard'; // Adjust path as necessary
import IndividualROICard from '../dashboard/Default/IndividualROICard'; // Adjust path as necessary
import StockPriceHistoryCard from '../dashboard/Default/StockPriceHistoryCard'; // Adjust path as necessary

const StockDetailsPage = () => {
  const { symbol } = useParams(); // Capture the stock symbol from the URL
  const navigate = useNavigate(); // Hook for navigation

  const handleBackToPortfolio = () => {
    navigate('/'); // Navigate to the landing page (adjust path as necessary)
  };

  return (
    <>
      <Button variant="contained" onClick={handleBackToPortfolio} style={{ margin: '20px 0' }}>
        Back to Portfolio
      </Button>
      <Grid container spacing={3}>
        {/* Display the stock's total value in the portfolio */}
        <Grid item xs={12} md={6}>
          <StockTotalValueCard symbol={symbol} />
        </Grid>

        {/* Display the individual ROI of that stock */}
        <Grid item xs={12} md={6}>
          <IndividualROICard symbol={symbol} />
        </Grid>

        {/* Table showing the stock's price history over the last 12 months */}
        <Grid item xs={12}>
          <StockPriceHistoryCard symbol={symbol} />
        </Grid>
      </Grid>
    </>
  );
};

export default StockDetailsPage;
