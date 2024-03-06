import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const LineGraph = () => {
  const [series, setSeries] = useState([]); // Un-comment and keep this line

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get('/api/stock-price-over-time');
        if (response.data && Array.isArray(response.data)) {
          // Transform and set your series data here based on the response
          const transformedSeries = response.data.map(stock => ({
            name: stock.symbol,
            data: stock.data.map(point => [new Date(point.date).getTime(), point.price]),
          }));
          setSeries(transformedSeries);
        } else {
          // Handle unexpected structure
        }
      } catch (error) {
        console.error('Failed to fetch stock data:', error);
        // Handle error
      }
    };
  
    fetchStockData();
  }, []);

  

  const options = {
    chart: {
      id: 'stocks-performance',
      type: 'line',
      height: 350,
      toolbar: {
        show: true,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    markers: {
      size: 0,
    },
    colors: ['#007bff', '#ff4560', '#00e396', '#feb019', '#775dd0'], // Add more colors if you have more than 5 stocks
    fill: {
      type: 'solid',
      opacity: 0.3,
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
      labels: {
        formatter: function (value) {
          return "$" + value.toFixed(2);
        },
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5
    },
  };

  return (
    <div id="chart">
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default LineGraph;