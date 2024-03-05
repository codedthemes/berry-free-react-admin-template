import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import axios from 'axios';
import ApexCharts from 'react-apexcharts';

// Assuming you've installed apexcharts and react-apexcharts
// npm install --save apexcharts react-apexcharts

// DataCard component for Total Portfolio Value and ROI
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

// TimeFrameOptions component for selecting the time frame
const TimeFrameOptions = ({ setTimeFrame }) => {
  const timeFrames = ['YTD', '6M', '1Y', 'ALL'];
  return (
    <Grid container spacing={1}>
      {timeFrames.map((frame) => (
        <Grid item key={frame}>
          <Button variant="contained" onClick={() => setTimeFrame(frame)}>
            {frame}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

// Chart component to render the line chart
const StockPerformanceChart = ({ seriesData }) => {
  const chartOptions = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: false // Hide the toolbar
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    markers: {
      size: 0
    },
    xaxis: {
      type: 'datetime'
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy'
      }
    },
    colors: ['#556ee6']
  };

  return (
    <div id="chart">
      <ApexCharts
        options={chartOptions}
        series={[{ name: 'Stock Performance', data: seriesData }]}
        type="line"
        height={350}
      />
    </div>
  );
};

// LandingPage component with state management and API calls
const LandingPage = () => {
  const [totalValue, setTotalValue] = useState(0);
  const [roi, setRoi] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const [timeFrame, setTimeFrame] = useState('YTD');

  useEffect(() => {
    // Function to fetch portfolio summary data
    const fetchPortfolioData = async () => {
      try {
        const response = await axios.get('/api/portfolio');
        const data = response.data;
        setTotalValue(data.total_portfolio_value);
        setRoi(data.roi);
      } catch (error) {
        console.error('Failed to fetch portfolio data:', error);
      }
    };

    // Function to fetch stock performance data
    const fetchStockPerformance = async () => {
      try {
        const response = await axios.get(`/api/stock-performance?symbol=YOUR_STOCK_SYMBOL&time_frame=${timeFrame}`);
        const data = response.data;
        // Process the data to match the format ApexCharts expects, e.g. [{ x: date, y: value }, ...]
        const seriesData = Object.entries(data).map(([date, value]) => ({
          x: new Date(date).getTime(),
          y: value
        }));
        setGraphData(seriesData);
      } catch (error) {
        console.error('Failed to fetch stock performance:', error);
      }
    };

    fetchPortfolioData();
    fetchStockPerformance();
  }, [timeFrame]);

  return (
    <Grid container spacing={2} padding={2}>
      {/* Cards for Total Portfolio Value and ROI */}
      <Grid item xs={12} sm={6}>
        <DataCard title="Total Portfolio Value" value={`$${totalValue.toLocaleString()}`} unit="" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <DataCard title="ROI" value={`${roi.toFixed(2)}%`} unit="" />
      </Grid>

      {/* Time Frame Selection */}
      <Grid item xs={12}>
        <Typography variant="h6">Select Time Frame:</Typography>
        <TimeFrameOptions setTimeFrame={setTimeFrame} />
      </Grid>

      {/* Chart for Stock Performance */}
      <Grid item xs={12}>
        <StockPerformanceChart seriesData={graphData} />
      </Grid>
    </Grid>
  );
};

export default LandingPage;

