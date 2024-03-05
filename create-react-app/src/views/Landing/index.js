import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import axios from 'axios'; // Assuming you've installed axios

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

// Time Frame Buttons - Could be replaced with select dropdown or another UI element
const TimeFrameOptions = ({ setTimeFrame }) => {
  const timeFrames = ['YTD', '6M', '1Y', 'ALL'];
  return (
    <Grid container spacing={1}>
      {timeFrames.map((frame) => (
        <Grid item key={frame}>
          <Button variant="contained" onClick={() => setTimeFrame(frame)}>{frame}</Button>
        </Grid>
      ))}
    </Grid>
  );
};

const LandingPage = () => {
  const [totalValue, setTotalValue] = useState(0);
  const [roi, setRoi] = useState(0);
  const [graphData, setGraphData] = useState({});
  const [timeFrame, setTimeFrame] = useState('YTD');

  useEffect(() => {
    // Fetch portfolio summary
    const fetchPortfolioData = async () => {
      try {
        const response = await axios.get('/api/portfolio');
        const data = response.data;
        setTotalValue(data.total_portfolio_value);
        setRoi(data.roi);
      } catch (error) {
        console.error("Failed to fetch portfolio data:", error);
      }
    };

    // Fetch stock performance based on the selected time frame
    const fetchStockPerformance = async () => {
      try {
        // Adjust the URL according to your symbol requirement, might be dynamic based on user selection
        const response = await axios.get(`/api/stock-performance?symbol=YOUR_STOCK_SYMBOL&time_frame=${timeFrame}`);
        const data = response.data;
        setGraphData(data);
      } catch (error) {
        console.error("Failed to fetch stock performance:", error);
      }
    };

    fetchPortfolioData();
    fetchStockPerformance();
  }, [timeFrame]); // This effect runs whenever the timeFrame state changes

  return (
    <Grid container spacing={2} padding={2}>
      {/* Portfolio Value and ROI Cards */}
      <Grid item xs={12} sm={6} md={4}>
        <DataCard title="Total Portfolio Value" value={totalValue} unit="USD" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DataCard title="ROI" value={roi.toFixed(2)} unit="%" />
      </Grid>

      {/* Time Frame Selection */}
      <Grid item xs={12}>
        <Typography variant="h6">Select Time Frame:</Typography>
        <TimeFrameOptions setTimeFrame={setTimeFrame} />
      </Grid>

      {/* Here you'd render your graph component, passing graphData as a prop */}
      {/* <YourGraphComponent data={graphData} /> */}
    </Grid>
  );
};

export default LandingPage;
