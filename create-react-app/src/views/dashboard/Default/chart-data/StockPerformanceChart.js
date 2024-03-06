import React from 'react';
import Chart from 'react-apexcharts';

const StockPerformanceChart = ({ seriesData, timeFrameOptions, setTimeFrame, selectedTimeFrame }) => {
  const chartOptions = {
    type: 'line',
    height: '350',
    options: {
      chart: {
        id: 'Portfolio Breakdown by Sttock Performance',
        toolbar: {
          show: true,
          tools: {
            download: false,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false
          },
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      tooltip: {
        theme: 'dark'
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        title: {
          text: 'Price'
        }
      }
    },
    series: [
      {
        name: 'Stock Price',
        data: seriesData
      }
    ]
  };

  return (
    <div>
      <div>
        {timeFrameOptions.map((frame) => (
          <button
            key={frame}
            onClick={() => setTimeFrame(frame)}
            style={{ background: frame === selectedTimeFrame ? 'blue' : 'grey' }}
          >
            {frame}
          </button>
        ))}
      </div>
      <Chart options={chartOptions.options} series={chartOptions.series} type="line" height={chartOptions.height} />
    </div>
  );
};

export default StockPerformanceChart;
