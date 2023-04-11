// third-party
import Chart from 'react-apexcharts';

// chart data
import ChartDataMonth from './chart-data/total-order-month-line-chart';
import ChartDataYear from './chart-data/total-order-year-line-chart';

// types
import PropTypes from 'prop-types';

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const TotalOrderLineChartCard = ({ timeValue }) => {
    return <>{timeValue ? <Chart {...ChartDataMonth} /> : <Chart {...ChartDataYear} />}</>;
};

TotalOrderLineChartCard.propTypes = {
    timeValue: PropTypes.bool
};

export default TotalOrderLineChartCard;
