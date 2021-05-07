import value from '../../../../assets/scss/_themes-vars.module.scss';

const chartData = {
    height: 480,
    type: 'bar',
    options: {
        chart: {
            stacked: true,
            toolbar: {
                show: true
            },
            zoom: {
                enabled: true
            }
        },
        colors: [value['blue200'], value['blue500'], value['deepPurple500'], value['deepPurple50']],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }
        ],
        plotOptions: {
            bar: {
                horizontal: false
            }
        },
        xaxis: {
            type: 'string',
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            labels: {
                style: {
                    colors: []
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: []
                }
            }
        },
        legend: {
            show: true,
            fontSize: '14px',
            fontFamily: `'Roboto', sans-serif`,
            position: 'bottom',
            offsetX: 10,
            labels: {
                colors: value['grey500'],
                useSeriesColors: false
            },
            markers: {
                width: 16,
                height: 16,
                radius: 5
            },
            itemMargin: {
                horizontal: 15,
                vertical: 8
            }
        },
        fill: {
            type: 'solid'
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            show: true
        }
    },
    series: [
        {
            name: 'Investment',
            data: [32, 124, 32, 32, 32, 80, 32]
        },
        {
            name: 'Loss',
            data: [32, 15, 15, 32, 64, 38, 78]
        },
        {
            name: 'Profit',
            data: [32, 145, 32, 32, 19, 102, 100]
        },
        {
            name: 'Maintenance',
            data: [0, 0, 0, 0, 0, 132]
        }
    ]
};
export default chartData;
