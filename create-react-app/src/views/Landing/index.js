import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import axios from 'axios';
import TotalValueCard from './TotalValueCard'; // Adjust path as needed
import ROICard from './ROICard'; // Adjust path as needed
import StockPerformanceChart from './StockPerformanceChart'; // Adjust path as needed

const LandingPage = () => {
  const [totalValue, setTotalValue] = useState(0);
  const [roi, setRoi] = useState(0);
  const [seriesData, setSeriesData] = useState([]);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('YTD');
  const timeFrameOptions = ['YTD', '6M', '1Y', '5Y'];

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

    fetchPortfolioData();
  }, []);

  useEffect(() => {
    // Fetch stock performance data based on the selected timeframe
    const fetchChartData = async () => {
      try {
        // This should be adjusted to fetch data for all stocks in the portfolio or a specific stock, as needed
        const response = await axios.get(`/api/stock-performance?time_frame=${selectedTimeFrame}`);
        const data = response.data;
        // Assume data is in the correct format for the chart { x: date, y: price }
        setSeriesData(data);
      } catch (error) {
        console.error("Failed to fetch stock performance data:", error);
      }
    };

    fetchChartData();
  }, [selectedTimeFrame]);

  return (
    <Grid container spacing={2} padding={2}>
      {/* Total Portfolio Value Card */}
      <Grid item xs={12} sm={6}>
        <TotalValueCard value={totalValue} />
      </Grid>

      {/* ROI Card */}
      <Grid item xs={12} sm={6}>
        <ROICard value={roi} />
      </Grid>

      {/* Stock Performance Chart with Time Frame Options */}
      <Grid item xs={12}>
        <StockPerformanceChart
          seriesData={seriesData}
          timeFrameOptions={timeFrameOptions}
          setTimeFrame={setSelectedTimeFrame}
          selectedTimeFrame={selectedTimeFrame}
        />
      </Grid>
    </Grid>
  );
};

export default LandingPage;
