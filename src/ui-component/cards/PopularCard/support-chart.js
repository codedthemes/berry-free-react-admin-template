import value from '../../../assets/scss/_themes-vars.module.scss';

const chartData = {
    type: 'area',
    height: 95,
    options: {
        chart: {
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: [value['deepOrange800']],
        stroke: {
            curve: 'smooth',
            width: 1
        },
        tooltip: {
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: (seriesName) => 'Ticket '
                }
            },
            marker: {
                show: false
            }
        }
    },
    series: [
        {
            data: [0, 15, 10, 50, 30, 40, 25]
        }
    ]
};
export default chartData;
