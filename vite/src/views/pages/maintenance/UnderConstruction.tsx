import { Link } from 'react-router-dom';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project imports
import { ThemeMode, DASHBOARD_PATH } from '../../config';
import AnimateButton from '../ui-component/extended/AnimateButton';
import { gridSpacing } from '../store/constant';

// assets
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';

import image from 'assets/images/maintenance/img-build.svg';
import imageBackground from 'assets/images/maintenance/img-bg-grid.svg';
import imageDarkBackground from 'assets/images/maintenance/img-bg-grid-dark.svg';
import imageParts from 'assets/images/maintenance/img-bg-parts.svg';

// styles
const CardMediaWrapper = styled('div')({
  maxWidth: 720,
  margin: '0 auto',
  position: 'relative'
});

const PageContentWrapper = styled('div')({
  maxWidth: 350,
  margin: '0 auto',
  textAlign: 'center'
});

const ConstructionCard = styled(Card)({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const CardMediaBuild = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  animation: '5s bounce ease-in-out infinite'
});

const CardMediaParts = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  animation: '10s blink ease-in-out infinite'
});

// ========================|| UNDER CONSTRUCTION PAGE ||======================== //

export default function UnderConstruction() {
  const theme = useTheme();

  return (
    <ConstructionCard>
      <CardContent>
        <Grid container spacing={gridSpacing} sx={{ justifyContent: 'center' }}>
          <Grid size={12}>
            <CardMediaWrapper>
              <CardMedia
                component="img"
                image={theme.palette.mode === ThemeMode.DARK ? imageDarkBackground : imageBackground}
                title="Slider 3 image"
              />
              <CardMediaParts src={imageParts} title="Slider 1 image" />
              <CardMediaBuild src={image} title="Slider 2 image" />
            </CardMediaWrapper>
          </Grid>
          <Grid size={12}>
            <PageContentWrapper>
              <Grid container spacing={gridSpacing}>
                <Grid size={12}>
                  <Typography variant="h1">Under Construction</Typography>
                </Grid>
                <Grid size={12}>
                  <Typography variant="body2">This site is on under construction!! Please check after some time</Typography>
                </Grid>
                <Grid size={12}>
                  <AnimateButton>
                    <Button variant="contained" size="large" component={Link} to={DASHBOARD_PATH}>
                      <HomeTwoToneIcon sx={{ fontSize: '1.3rem', mr: 0.75 }} /> Home
                    </Button>
                  </AnimateButton>
                </Grid>
              </Grid>
            </PageContentWrapper>
          </Grid>
        </Grid>
      </CardContent>
    </ConstructionCard>
  );
}
