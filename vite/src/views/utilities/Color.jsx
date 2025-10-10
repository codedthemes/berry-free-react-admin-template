// material-ui
import { useColorScheme, useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

// ===============================|| COLOR BOX ||=============================== //

const ColorBox = ({ bgcolor, title, data, dark }) => (
  <>
    <Card sx={{ mb: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4.5,
          bgcolor,
          color: dark ? 'grey.800' : 'common.white'
        }}
      >
        {title && (
          <Typography variant="subtitle1" sx={{ color: 'inherit' }}>
            {title}
          </Typography>
        )}
        {!title && <Box sx={{ p: 1.15 }} />}
      </Box>
    </Card>
    {data && (
      <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Grid>
          <Typography variant="subtitle2">{data.label}</Typography>
        </Grid>
        <Grid>
          <Typography variant="subtitle1" sx={{ textTransform: 'uppercase' }}>
            {data.color}
          </Typography>
        </Grid>
      </Grid>
    )}
  </>
);

// ===============================|| UI COLOR ||=============================== //

export default function UIColor() {
  const theme = useTheme();
  const { colorScheme } = useColorScheme();

  const scheme = colorScheme ?? 'light';
  const schemeTheme = theme.colorSchemes?.[scheme];

  const currentPalette = schemeTheme ? schemeTheme.palette : theme.palette;

  return (
    <MainCard title="Color Palette" secondary={<SecondaryAction link="https://next.material-ui.com/system/palette/" />}>
      <Grid container spacing={gridSpacing}>
        <Grid size={12}>
          <SubCard title="Primary Color">
            <Grid container spacing={gridSpacing}>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox
                  bgcolor="primary.light"
                  data={{ label: 'Blue-50', color: currentPalette.primary.light }}
                  title="primary.light"
                  dark
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox
                  bgcolor="primary.200"
                  data={{ label: 'Blue-200', color: currentPalette.primary[200] }}
                  title="primary[200]"
                  dark
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox bgcolor="primary.main" data={{ label: 'Blue-500', color: currentPalette.primary.main }} title="primary.main" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox bgcolor="primary.dark" data={{ label: 'Blue-600', color: currentPalette.primary.dark }} title="primary.dark" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox bgcolor="primary.800" data={{ label: 'Blue-800', color: currentPalette.primary[800] }} title="primary[800]" />
              </Grid>
            </Grid>
          </SubCard>
        </Grid>
        <Grid size={12}>
          <SubCard title="Secondary Color">
            <Grid container spacing={gridSpacing}>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox
                  bgcolor="secondary.light"
                  data={{ label: 'DeepPurple-50', color: currentPalette.secondary.light }}
                  title="secondary.light"
                  dark
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox
                  bgcolor="secondary.200"
                  data={{ label: 'DeepPurple-200', color: currentPalette.secondary[200] }}
                  title="secondary[200]"
                  dark
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox
                  bgcolor="secondary.main"
                  data={{ label: 'DeepPurple-500', color: currentPalette.secondary.main }}
                  title="secondary.main"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox
                  bgcolor="secondary.dark"
                  data={{ label: 'DeepPurple-600', color: currentPalette.secondary.dark }}
                  title="secondary.dark"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox
                  bgcolor="secondary.800"
                  data={{ label: 'DeepPurple-800', color: currentPalette.secondary[800] }}
                  title="secondary[800]"
                />
              </Grid>
            </Grid>
          </SubCard>
        </Grid>
        <Grid size={12}>
          <SubCard title="Success Color">
            <Grid container spacing={gridSpacing}>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox
                  bgcolor="success.light"
                  data={{ label: 'Green-A100', color: currentPalette.success.light }}
                  title="success.light"
                  dark
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox bgcolor="success.200" data={{ label: 'Green-A200', color: currentPalette.success[200] }} title="success[200]" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox bgcolor="success.main" data={{ label: 'Green-A400', color: currentPalette.success.main }} title="success.main" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox bgcolor="success.dark" data={{ label: 'Green-A700', color: currentPalette.success.dark }} title="success.dark" />
              </Grid>
            </Grid>
          </SubCard>
        </Grid>
        <Grid size={12}>
          <SubCard title="Orange Color">
            <Grid container spacing={gridSpacing}>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox
                  bgcolor="orange.light"
                  data={{ label: 'DeepOrange-50', color: currentPalette.orange.light }}
                  title="orange.light"
                  dark
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox bgcolor="orange.main" data={{ label: 'DeepOrange-200', color: currentPalette.orange.main }} title="orange.main" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox bgcolor="orange.dark" data={{ label: 'DeepOrange-800', color: currentPalette.orange.dark }} title="orange.dark" />
              </Grid>
            </Grid>
          </SubCard>
        </Grid>
        <Grid size={12}>
          <SubCard title="Error Color">
            <Grid container spacing={gridSpacing}>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox bgcolor="error.light" data={{ label: 'Red-50', color: currentPalette.error.light }} title="error.light" dark />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox bgcolor="error.main" data={{ label: 'Red-200', color: currentPalette.error.main }} title="error.main" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox bgcolor="error.dark" data={{ label: 'Red-800', color: currentPalette.error.dark }} title="error.dark" />
              </Grid>
            </Grid>
          </SubCard>
        </Grid>
        <Grid size={12}>
          <SubCard title="Warning Color">
            <Grid container spacing={gridSpacing}>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox
                  bgcolor="warning.light"
                  data={{ label: 'Amber-50', color: currentPalette.warning.light }}
                  title="warning.light"
                  dark
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox
                  bgcolor="warning.main"
                  data={{ label: 'Amber-100', color: currentPalette.warning.main }}
                  title="warning.main"
                  dark
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox bgcolor="warning.dark" data={{ label: 'Amber-500', color: currentPalette.warning.dark }} title="warning.dark" />
              </Grid>
            </Grid>
          </SubCard>
        </Grid>
        <Grid size={12}>
          <SubCard title="Grey Color">
            <Grid container spacing={gridSpacing}>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox bgcolor="grey.50" data={{ label: 'Grey-50', color: currentPalette.grey[50] }} title="grey[50]" dark />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox bgcolor="grey.100" data={{ label: 'Grey-100', color: currentPalette.grey[100] }} title="grey[100]" dark />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox bgcolor="grey.200" data={{ label: 'Grey-200', color: currentPalette.grey[200] }} title="grey[200]" dark />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox bgcolor="grey.300" data={{ label: 'Grey-300', color: currentPalette.grey[300] }} title="grey[300]" dark />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox bgcolor="grey.500" data={{ label: 'Grey-500', color: currentPalette.grey[500] }} title="grey[500]" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox bgcolor="grey.600" data={{ label: 'Grey-600', color: currentPalette.grey[600] }} title="grey[600]" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox bgcolor="grey.700" data={{ label: 'Grey-700', color: currentPalette.grey[700] }} title="grey[700]" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox bgcolor="grey.900" data={{ label: 'Grey-900', color: currentPalette.grey[900] }} title="grey[900]" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                <ColorBox bgcolor="#fff" data={{ label: 'Pure White', color: '#ffffff' }} title="Pure White" dark />
              </Grid>
            </Grid>
          </SubCard>
        </Grid>
      </Grid>
    </MainCard>
  );
}
