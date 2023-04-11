import { useNavigate } from '@remix-run/react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';

// assets
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';

import imageBackground from 'assets/images/maintenance/img-error-bg.svg';
import imageDarkBackground from 'assets/images/maintenance/img-error-bg-dark.svg';
import imageBlue from 'assets/images/maintenance/img-error-blue.svg';
import imageText from 'assets/images/maintenance/img-error-text.svg';
import imagePurple from 'assets/images/maintenance/img-error-purple.svg';

// styles
const CardMediaWrapper = styled('div')({
    maxWidth: 720,
    margin: '0 auto',
    position: 'relative'
});

const ErrorWrapper = styled('div')({
    maxWidth: 350,
    margin: '0 auto',
    textAlign: 'center'
});

const ErrorCard = styled(Card)({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

const CardMediaBlock = styled('img')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    animation: '3s bounce ease-in-out infinite'
});

const CardMediaBlue = styled('img')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    animation: '15s wings ease-in-out infinite'
});

const CardMediaPurple = styled('img')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    animation: '12s wings ease-in-out infinite'
});

// ==============================|| ERROR PAGE ||============================== //

const ErrorPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <ErrorCard>
            <CardContent>
                <Grid container justifyContent="center" spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <CardMediaWrapper>
                            <CardMedia
                                component="img"
                                image={theme.palette.mode === 'dark' ? imageDarkBackground : imageBackground}
                                title="Slider5 image"
                            />
                            <CardMediaBlock src={imageText} title="Slider 1 image" />
                            <CardMediaBlue src={imageBlue} title="Slider 2 image" />
                            <CardMediaPurple src={imagePurple} title="Slider 3 image" />
                        </CardMediaWrapper>
                    </Grid>
                    <Grid item xs={12}>
                        <ErrorWrapper>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <Typography variant="h1" component="div">
                                        Something is wrong
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">
                                        The page you are looking was moved, removed, renamed, or might never exist!{' '}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <AnimateButton>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            // component={Link}
                                            // to='/'
                                            onClick={() => {
                                                navigate(-1);
                                            }}
                                        >
                                            <HomeTwoToneIcon sx={{ fontSize: '1.3rem', mr: 0.75 }} /> Home
                                        </Button>
                                        {/* <Link to='/'>BACK TO HOME</Link> */}
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </ErrorWrapper>
                    </Grid>
                </Grid>
            </CardContent>
        </ErrorCard>
    );
};

export default ErrorPage;
