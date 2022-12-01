import DayWeekDummy from 'db/dayWeek.json';
const DailyCardChartData = {
    height: 285,
    type: 'bar',
    options: {
        chart: {
            id: 'bar-chart',
            stacked: false,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: true
            }
        },
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
                horizontal: false,
                columnWidth: '50%'
            }
        },
        xaxis: {
            type: 'category',
            categories: DayWeekDummy.map(function (dummy) {
                return dummy.dayWeek;
            })
        },
        legend: {
            show: true,
            fontSize: '14px',
            fontFamily: `'Roboto', sans-serif`,
            position: 'bottom',
            offsetX: 20,
            labels: {
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
            name: '지난주',
            data: DayWeekDummy.map(function (dummy) {
                return dummy.lastWeekVisit;
            })
        },
        {
            name: '이번주',
            data: DayWeekDummy.map(function (dummy) {
                return dummy.thisWeekVisit;
            })
        },
        {
            name: '최고점',
            data: [3500]
        }
    ]
};
export default DailyCardChartData;
