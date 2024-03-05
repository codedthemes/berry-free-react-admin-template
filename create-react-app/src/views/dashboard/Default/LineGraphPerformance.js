import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const LineGraph = () => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      id: 'stock-performance',
      type: 'line',
      height: 350,
      toolbar: {
        show: false, // If you want a cleaner look without the toolbar
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    colors: ['#007bff'], // Example color, adjust as needed
    fill: {
      type: 'solid',
      opacity: 0.3, // Adjust based on your preference
    },
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      theme: 'dark',
      x: {
        format: 'dd MMM yyyy',
      },
    },
    yaxis: {
      // If you decide to set a min and max, it's here. Otherwise, omit or adjust.
    },
    // Additional customization here
  });
  
  const [timeFrame, setTimeFrame] = useState('YTD');

  useEffect(() => {
    // Function to fetch stock performance data
    const fetchStockPerformance = async () => {
      try {
        // Example API call: adjust according to your backend API endpoint and parameters
        const response = await axios.get(`/api/stock-performance`, {
          params: {
            symbol: 'AAPL', // This should be dynamic based on user input or selection
            time_frame: timeFrame,
          },
        });

        const data = response.data;

        // Transform data for ApexCharts
        const chartSeries = [{
          name: 'Stock Price',
          data: Object.entries(data).map(([date, price]) => [new Date(date).getTime(), price]),
        }];

        setSeries(chartSeries);
      } catch (error) {
        console.error('Failed to fetch stock performance:', error);
      }
    };

    fetchStockPerformance();
  }, [timeFrame]);

  return (
    <div id="chart">
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default LineGraph;
