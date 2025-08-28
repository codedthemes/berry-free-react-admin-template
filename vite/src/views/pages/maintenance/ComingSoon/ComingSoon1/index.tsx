import { useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third party
import Lightbox from 'yet-another-react-lightbox';

// project imports
import { ThemeDirection, ThemeMode } from '../../config';
import MailerSubscriber from './MailerSubscriber';
import Slider from './Slider';
import useConfig from '../../hooks/useConfig';
import { gridSpacing } from '../store/constant';

// assets
import { IconBrandDribbble } from '@tabler/icons-react';
import FiberManualRecordTwoToneIcon from '@mui/icons-material/FiberManualRecordTwoTone';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import BookIcon from '@mui/icons-material/Book';

import logo from 'assets/images/logo.svg';
import logoDark from 'assets/images/logo-dark.svg';
import companyLightLogo from 'assets/images/maintenance/img-ct-light-logo.png';
import companyDarkLogo from 'assets/images/maintenance/img-ct-dark-logo.png';
import imageBackground from 'assets/images/maintenance/img-soon-bg.svg';
import imageGrid from 'assets/images/maintenance/img-soon-bg-grid.svg';
import imageDarkGrid from 'assets/images/maintenance/img-soon-bg-grid-dark.svg';
import imageSoon2 from 'assets/images/maintenance/img-soon-2.svg';
import imageSoon3 from 'assets/images/maintenance/img-soon-3.svg';
import imageSoon4 from 'assets/images/maintenance/img-soon-4.svg';
import imageSoon5 from 'assets/images/maintenance/img-soon-5.svg';
import imageSoon6 from 'assets/images/maintenance/img-soon-6.svg';
import imageSoon7 from 'assets/images/maintenance/img-soon-7.svg';
import imageSoon8 from 'assets/images/maintenance/img-soon-8.svg';
import imageLightSlider1 from 'assets/images/landing/pre-apps/slider-light-1.png';
import imageDarkSlider1 from 'assets/images/landing/pre-apps/slider-dark-1.png';
import imageLightSlider2 from 'assets/images/landing/pre-apps/slider-light-2.png';
import imageDarkSlider2 from 'assets/images/landing/pre-apps/slider-dark-2.png';
import imageLightSlider3 from 'assets/images/landing/pre-apps/slider-light-3.png';
import imageDarkSlider3 from 'assets/images/landing/pre-apps/slider-dark-3.png';

// styles
const CardMediaWrapper = styled('div')(({ theme }) => ({
  maxWidth: 720,
  margin: '0 auto',
  position: 'relative',
  [theme.breakpoints.down('xl')]: {
    marginTop: 30
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.down('lg')]: {
    display: 'none'
  }
}));

const PageContentWrapper = styled('div')(({ theme }) => ({
  maxWidth: 550,
  margin: '0 0 0 auto',
  [theme.breakpoints.down('lg')]: {
    margin: '0 auto'
  },
  [theme.breakpoints.up(1400)]: {
    maxWidth: 600
  }
}));

const ComingSoonCard = styled(Card)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.down('lg')]: {
    display: 'block'
  },
  [theme.breakpoints.up(1200)]: {
    overflow: 'hidden',
    maxHeight: '100vh'
  },
  [theme.breakpoints.up(1400)]: {
    alignItems: 'center'
  }
}));

const SliderWrapper = styled('div')(({ theme }) => ({
  borderRadius: '8px',
  width: 'calc(100% - 40px)',
  marginLeft: 40,
  height: 'calc(100% - 40px)',
  position: 'absolute',
  left: 0,
  background: theme.palette.mode === ThemeMode.DARK ? theme.palette.dark.main : theme.palette.primary.light
}));

const CardMediaGrid = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: 3
});

const CardMediaWidget = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  animation: '5s wings ease-in-out infinite',
  zIndex: 5,
  '&:nth-of-type(3)': {
    animationDelay: '2s'
  },
  '&:nth-of-type(4)': {
    animationDelay: '1s'
  },
  '&:nth-of-type(5)': {
    animationDelay: '3s'
  },
  '&:nth-of-type(9)': {
    animationDelay: '5s'
  },
  '&:nth-of-type(10)': {
    animationDelay: '6s'
  },
  '&:nth-of-type(7)': {
    animation: '3s blink ease-in-out infinite',
    animationDelay: '1s'
  },
  '&:nth-of-type(6)': {
    animation: '3s blink ease-in-out infinite',
    animationDelay: '2s'
  }
});

// ===========================|| COMING SOON 1 ||=========================== //

export default function ComingSoon1() {
  const theme = useTheme();

  const { themeDirection } = useConfig();
  const [photoIndex, setPhotoIndex] = useState(-1);

  const handleClickOpen = (slideIndex: number) => {
    setPhotoIndex(slideIndex);
  };

  const imageSlider1 = theme.palette.mode === ThemeMode.DARK ? imageDarkSlider1 : imageLightSlider1;
  const imageSlider2 = theme.palette.mode === ThemeMode.DARK ? imageDarkSlider2 : imageLightSlider2;
  const imageSlider3 = theme.palette.mode === ThemeMode.DARK ? imageDarkSlider3 : imageLightSlider3;

  const images = [{ src: imageSlider1 }, { src: imageSlider2 }, { src: imageSlider3 }];

  const mediaWidgetStyle = {
    ...(themeDirection === ThemeDirection.RTL && { transform: 'scaleX(-1)', animation: '5s wingsReverse ease-in-out infinite' })
  };

  return (
    <ComingSoonCard>
      <CardContent sx={{ p: 0 }}>
        <CardContent sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            image={imageBackground}
            title="Slider5 image"
            sx={{ position: 'absolute', bottom: -40, left: 50, width: 400, transform: 'rotate(145deg)' }}
          />
          <CardMedia
            component="img"
            src={theme.palette.mode === ThemeMode.DARK ? logoDark : logo}
            alt="Berry"
            sx={{
              position: themeDirection === ThemeDirection.RTL ? 'relative' : 'initial',
              top: themeDirection === ThemeDirection.RTL ? 30 : 'initial',
              width: 'auto'
            }}
          />
        </CardContent>
        <Grid container spacing={gridSpacing}>
          <Grid size={12}>
            <CardMediaWrapper>
              <CardMedia
                component="img"
                image={imageBackground}
                title="Slider5 image"
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  ...(themeDirection === ThemeDirection.RTL && { transform: 'scaleX(-1) scaleY(0.95)' })
                }}
              />
              <CardMediaGrid
                src={theme.palette.mode === ThemeMode.DARK ? imageDarkGrid : imageGrid}
                title="Slider5 image"
                sx={{ ...(themeDirection === ThemeDirection.RTL && { transform: 'scaleX(-1)' }) }}
              />
              <CardMediaWidget src={imageSoon2} sx={mediaWidgetStyle} title="Slider5 image" />
              <CardMediaWidget src={imageSoon3} sx={mediaWidgetStyle} title="Slider5 image" />
              <CardMediaWidget src={imageSoon4} sx={mediaWidgetStyle} title="Slider5 image" />
              <CardMediaWidget src={imageSoon5} sx={mediaWidgetStyle} title="Slider5 image" />
              <CardMediaWidget src={imageSoon6} sx={mediaWidgetStyle} title="Slider5 image" />
              <CardMediaWidget src={imageSoon7} sx={mediaWidgetStyle} title="Slider5 image" />
              <CardMediaWidget src={imageSoon8} sx={mediaWidgetStyle} title="Slider5 image" />
            </CardMediaWrapper>
          </Grid>
        </Grid>
      </CardContent>
      <CardContent sx={{ padding: { xs: 3, xl: 10 }, margin: '0 auto' }}>
        <Grid container spacing={gridSpacing}>
          <Grid size={12}>
            <PageContentWrapper>
              <Grid container spacing={gridSpacing}>
                <Grid size={12}>
                  <Typography variant="h2" color="primary">
                    Coming Soon
                  </Typography>
                </Grid>
                <Grid size={12}>
                  <Grid container spacing={2}>
                    <Grid size={12}>
                      <Typography variant="h1">Berry - The React Admin Template</Typography>
                    </Grid>
                    <Grid size={12}>
                      <Typography sx={{ fontSize: '1.125rem' }}>
                        Presenting Material-UI based React Dashboard Template to build performance centric websites and applications.
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid size={12}>
                  <Grid container spacing={gridSpacing}>
                    <Grid>
                      <Typography variant="h5" color="secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                        <FiberManualRecordTwoToneIcon sx={{ mr: 0.625, fontSize: '1rem', mb: 0.25 }} />
                        Flexible & Fast
                      </Typography>
                    </Grid>
                    <Grid>
                      <Typography variant="h5" color="secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                        <FiberManualRecordTwoToneIcon sx={{ mr: 0.625, fontSize: '1rem', mb: 0.25 }} />
                        Material UI
                      </Typography>
                    </Grid>
                    <Grid>
                      <Typography variant="h5" color="secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                        <FiberManualRecordTwoToneIcon sx={{ mr: 0.625, fontSize: '1rem', mb: 0.25 }} />
                        Javascript / Typescript
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid size={12}>
                  <MailerSubscriber />
                </Grid>
                <Grid size={12}>
                  <Grid container spacing={gridSpacing} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <Grid sx={{ position: 'relative' }} size={{ xs: 12, sm: 6 }}>
                      <SliderWrapper />
                      <Box
                        sx={{
                          width: 'calc(100% - 20px)',
                          mt: 2.5,
                          boxShadow: '0px 45px 45px rgba(30, 136, 229, 0.2)',
                          borderRadius: '8px',
                          overflow: 'hidden'
                        }}
                      >
                        <Slider handleClickOpen={handleClickOpen} />
                      </Box>
                    </Grid>
                    <Grid sx={{ position: 'relative' }} size={{ xs: 12, sm: 6 }}>
                      <Grid container spacing={gridSpacing} sx={{ justifyContent: 'space-between' }}>
                        <Grid size={12}>
                          <Grid container spacing={1} sx={{ justifyContent: 'flex-end' }}>
                            <Grid>
                              <ButtonBase component={Link} href="https://links.codedthemes.com/HTIBc" target="_blank" aria-label="blog">
                                <Avatar
                                  sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.mediumAvatar,
                                    bgcolor:
                                      theme.palette.mode === ThemeMode.DARK ? theme.palette.dark.main : theme.palette.secondary.light,
                                    color:
                                      theme.palette.mode === ThemeMode.DARK ? theme.palette.secondary.main : theme.palette.secondary.dark
                                  }}
                                >
                                  <BookIcon />
                                </Avatar>
                              </ButtonBase>
                            </Grid>
                            <Grid>
                              <ButtonBase
                                component={Link}
                                href="https://www.facebook.com/codedthemes"
                                target="_blank"
                                aria-label="facebook"
                              >
                                <Avatar
                                  sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.mediumAvatar,
                                    bgcolor: theme.palette.mode === ThemeMode.DARK ? theme.palette.dark.main : theme.palette.primary.light,
                                    color: theme.palette.mode === ThemeMode.DARK ? theme.palette.primary.main : theme.palette.primary.dark
                                  }}
                                >
                                  <FacebookIcon />
                                </Avatar>
                              </ButtonBase>
                            </Grid>
                            <Grid>
                              <ButtonBase component={Link} href="https://twitter.com/codedthemes" target="_blank" aria-label="twitter">
                                <Avatar
                                  sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.mediumAvatar,
                                    bgcolor: theme.palette.mode === ThemeMode.DARK ? theme.palette.dark.main : theme.palette.warning.light,
                                    color: theme.palette.mode === ThemeMode.DARK ? theme.palette.warning.dark : theme.palette.warning.dark
                                  }}
                                >
                                  <TwitterIcon />
                                </Avatar>
                              </ButtonBase>
                            </Grid>
                            <Grid>
                              <ButtonBase component={Link} href="https://github.com/codedthemes" target="_blank" aria-label="github">
                                <Avatar
                                  sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.mediumAvatar,
                                    bgcolor: theme.palette.mode === ThemeMode.DARK ? theme.palette.dark.main : theme.palette.grey[200],
                                    color: theme.palette.mode === ThemeMode.DARK ? theme.palette.dark.light : theme.palette.grey[800]
                                  }}
                                >
                                  <GitHubIcon />
                                </Avatar>
                              </ButtonBase>
                            </Grid>
                            <Grid>
                              <ButtonBase component={Link} href="https://dribbble.com/codedthemes" target="_blank" aria-label="dribble">
                                <Avatar
                                  sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.mediumAvatar,
                                    bgcolor: theme.palette.mode === ThemeMode.DARK ? theme.palette.dark.main : 'grey.100',
                                    color: theme.palette.mode === ThemeMode.DARK ? 'grey.600' : 'grey.500'
                                  }}
                                >
                                  <IconBrandDribbble />
                                </Avatar>
                              </ButtonBase>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid size={12}>
                          <Grid container spacing={1} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Grid>
                              <Typography variant="body1" sx={{ textAlign: 'right' }}>
                                Project By
                              </Typography>
                            </Grid>
                            <Grid>
                              <CardMedia
                                component="img"
                                src={theme.palette.mode === ThemeMode.DARK ? companyDarkLogo : companyLightLogo}
                                alt="Berry"
                                sx={{ display: 'initial' }}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </PageContentWrapper>
          </Grid>
        </Grid>
      </CardContent>
      <Lightbox index={photoIndex} slides={images} open={photoIndex >= 0} close={() => setPhotoIndex(-1)} />
    </ComingSoonCard>
  );
}
