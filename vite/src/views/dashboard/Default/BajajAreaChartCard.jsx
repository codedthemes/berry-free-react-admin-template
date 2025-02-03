import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

// third party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import chartData from './chart-data/bajaj-area-chart';

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

export default function BajajAreaChartCard() {
  const theme = useTheme();

  const orangeDark = theme.palette.secondary[800];

  React.useEffect(() => {
    const newSupportChart = {
      ...chartData.options,
      colors: [orangeDark],
      tooltip: { theme: 'light' }
    };
    ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
  }, [orangeDark]);

  return (
    <Card sx={{ bgcolor: 'secondary.light' }}>
      <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
        <Grid size={12}>
          <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Grid>
              <Typography variant="subtitle1" sx={{ color: 'secondary.dark' }}>
                Bajaj Finery
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="h4" sx={{ color: 'grey.800' }}>
                $1839.00
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={12}>
          <Typography variant="subtitle2" sx={{ color: 'grey.800' }}>
            10% Profit
          </Typography>
        </Grid>
      </Grid>
      <Chart {...chartData} />
    </Card>
  );
}
