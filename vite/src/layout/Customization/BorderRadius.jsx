// material-ui
import Grid from '@mui/material/Grid2';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import useConfig from 'hooks/useConfig';

// concat 'px'
function valueText(value) {
  return `${value}px`;
}

export default function BorderRadius() {
  const { mode, borderRadius, onChangeBorderRadius } = useConfig();

  return (
    <Stack spacing={2.5} sx={{ pl: 2, pb: 2, pr: 4 }}>
      <Typography variant="h5">BORDER RADIUS</Typography>
      <Grid container spacing={1.25} sx={{ pt: 2, alignItems: 'center', justifyContent: 'center' }}>
        <Grid>
          <Typography variant="h6">4px</Typography>
        </Grid>
        <Grid size="grow">
          <Slider
            size="small"
            value={borderRadius}
            onChange={onChangeBorderRadius}
            getAriaValueText={valueText}
            valueLabelDisplay="on"
            aria-labelledby="discrete-slider-small-steps"
            min={4}
            max={24}
            color="primary"
            sx={{
              '& .MuiSlider-valueLabel': {
                color: 'primary.light'
              }
            }}
          />
        </Grid>
        <Grid>
          <Typography variant="h6">24px</Typography>
        </Grid>
      </Grid>
    </Stack>
  );
}
