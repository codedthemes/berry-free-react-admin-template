// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART ||============================== //

const chartOptions = {
  chart: {
    sparkline: {
      enabled: true
    }
  },
  dataLabels: {
    enabled: false
  },
  colors: ['#fff'],
  fill: {
    type: 'solid',
    opacity: 1
  },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  yaxis: {
    min: 0,
    max: 100,
    labels: { show: false }
  },
  tooltip: { fixed: { enabled: false }, x: { show: false }, y: { title: { formatter: () => 'Total Order' } }, marker: { show: false } }
};

export default chartOptions;
