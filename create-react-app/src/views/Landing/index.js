import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

// Card component to display data
const DataCard = ({ title, value, unit }) => (
  <Card>
    <CardContent>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="h4">
        {value} {unit}
      </Typography>
    </CardContent>
  </Card>
);

// The LandingPage component that makes an API call to fetch data
const LandingPage = () => {
  // State for total portfolio value and ROI
  const [totalValue, setTotalValue] = useState(0);
  const [roi, setRoi] = useState(0);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    // Function to fetch portfolio data from the backend
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch('/api/portfolio');
        const data = await response.json();
        setTotalValue(data.total_portfolio_value);
        setRoi(data.roi);
        setGraphData(data.graph_data);
      } catch (error) {
        console.error("Failed to fetch portfolio data:", error);
      }
    };

    fetchPortfolioData();
  }, []);

  return (
    <Grid container spacing={2} padding={2}>
      {/* Total Portfolio Value Card */}
      <Grid item xs={12} sm={6} md={4}>
        <DataCard title="Total Portfolio Value" value={totalValue} unit="USD" />
      </Grid>

      {/* ROI Card */}
      <Grid item xs={12} sm={6} md={4}>
        <DataCard title="ROI" value={roi.toFixed(2)} unit="%" />
      </Grid>

      {/* Additional cards or components can be added here */}
    </Grid>
  );
};

export default LandingPage;

