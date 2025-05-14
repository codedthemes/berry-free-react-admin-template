// ==============================|| DASHBOARD - TOTAL GROWTH BAR CHART ||============================== //

const chartOptions = {
  chart: {
    type: 'bar',
    height: 480,
    stacked: true,
    toolbar: { show: true },
    zoom: { enabled: true }
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '50%'
    }
  },
  dataLabels: { enabled: false },
  xaxis: {
    type: 'category',
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  fill: { type: 'solid' },
  legend: {
    show: true,
    fontFamily: 'Roboto, sans-serif',
    position: 'bottom',
    offsetX: 20,
    labels: {
      useSeriesColors: false
    },
    markers: {
      size: 8,
      shape: 'square'
    },
    itemMargin: {
      horizontal: 15,
      vertical: 8
    }
  },
  grid: { show: true }
};

export default chartOptions;
