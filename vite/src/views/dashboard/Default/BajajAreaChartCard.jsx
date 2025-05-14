import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// third party
import Chart from 'react-apexcharts';

// project imports
import chartData from './chart-data/bajaj-area-chart';

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

export default function BajajAreaChartCard() {
  const theme = useTheme();
  const orangeDark = theme.palette.secondary[800];

  const [chartConfig, setChartConfig] = useState(chartData);

  useEffect(() => {
    setChartConfig((prevState) => ({
      ...prevState,
      options: {
        ...prevState.options,
        colors: [orangeDark],
        tooltip: { ...prevState?.options?.tooltip, theme: 'light' }
      }
    }));
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
      <Chart {...chartConfig} />
    </Card>
  );
}
