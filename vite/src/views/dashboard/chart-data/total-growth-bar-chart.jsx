// ==============================|| DASHBOARD - TOTAL GROWTH BAR CHART ||============================== //

export const chartOptions = {
    chart: {
        type: 'bar',
        stacked: true,
        toolbar: {
            show: true
        }
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '50%'
        }
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    legend: {
        show: true,
        fontFamily: `'Roboto', sans-serif`,
        position: 'bottom',
        itemMargin: {
            horizontal: 15,
            vertical: 8
        },
        markers: {
            shape: 'circle'
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
};

export const chartSeries = [
    {
        name: 'Investment',
        data: [35, 125, 35, 35, 35, 80, 35, 20, 35, 45, 15, 75]
    },
    {
        name: 'Loss',
        data: [35, 15, 15, 35, 65, 40, 80, 25, 15, 85, 25, 75]
    },
    {
        name: 'Profit',
        data: [35, 145, 35, 35, 20, 105, 100, 10, 65, 45, 30, 10]
    },
    {
        name: 'Maintenance',
        data: [0, 0, 75, 0, 0, 115, 0, 0, 0, 0, 150, 0]
    }
];
