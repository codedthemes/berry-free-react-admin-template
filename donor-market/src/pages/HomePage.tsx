import Navbar from '../components/Navbar/Navbar';
import { Typography, Button, Box } from '@mui/material';
import donorHandsImage from '../assets/icons/donor-hands.jpeg';
import womanDonorImage from '../assets/icons/woman-donor.jpeg';
import { useTheme, useMediaQuery } from '@mui/material';
import Icon from '../components/Icon/Icon';

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <Navbar />
      <Box m={4}>
        <Typography
          variant={isMobile ? 'h4' : 'h2'}
          gutterBottom
          style={{ fontWeight: 'bold' }}
        >
          Help Save Lives with Unvaccinated Blood Donors
        </Typography>
        <Box my={2}>
          <Typography variant="subtitle1" gutterBottom>
            Connect with unvaccinated blood donors easily and contribute towards
            saving lives. Find the perfect match for your blood type and make a
            difference today.
          </Typography>
        </Box>
        <Box my={4}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: '10px' }}
          >
            Get Started
          </Button>
          <Button variant="outlined" color="primary">
            Learn More
          </Button>
        </Box>
        <Box my={5}>
          <img
            src={donorHandsImage}
            alt="Donor Hands"
            style={{
              width: isMobile ? '100%' : '1000px', // Increased width for desktop
              height: 'auto',
              objectFit: 'cover',
              borderRadius: '15px', // Added rounded corners for all resolutions
            }}
          />
        </Box>
        <Box display="flex" my={5} py={4}>
          <Box display="flex" flexDirection={isMobile ? 'column' : 'row'}>
            <Box
              display="flex"
              flexDirection="column"
              flexBasis={isMobile ? '100%' : '50%'}
              id="whyTextSection"
            >
              <Typography
                variant="h4"
                gutterBottom
                style={{ fontWeight: 'bold' }}
              >
                Why Choose Unvaccinated Blood Donors?
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Discover the benefits of selecting unvaccinated blood donors for
                transfusions.
              </Typography>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                my={1}
                style={{ paddingLeft: isMobile ? '0' : '4rem' }} // Added padding to the left on desktop
              >
                <Icon
                  name={'vertical-lines'}
                  style={{
                    marginRight: '2rem',
                    backgroundColor: 'rgb(255, 204, 204)',
                    borderRadius: '50%',
                  }}
                />
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                >
                  <Typography
                    variant="h6"
                    align="center"
                    style={{ fontWeight: 'bold' }}
                  >
                    Higher Antibody Levels
                  </Typography>
                  <Typography variant="subtitle1" align="left">
                    Unvaccinated blood donors tend to have higher levels of
                    natural antibodies, which can be beneficial for certain
                    patients.
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                my={1}
                style={{ paddingLeft: isMobile ? '0' : '4rem' }} // Added padding to the left on desktop
              >
                <Icon
                  name={'home-heart'}
                  style={{
                    marginRight: '2rem',
                    backgroundColor: 'rgb(255, 204, 204)',
                    borderRadius: '50%',
                  }}
                />
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                >
                  <Typography
                    variant="h6"
                    align="center"
                    style={{ fontWeight: 'bold' }}
                  >
                    Reduced Risk of Complications
                  </Typography>
                  <Typography variant="subtitle1" align="left">
                    By choosing unvaccinated blood donors, you can potentially
                    reduce the risk of complications related to vaccine
                    reactions.
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                my={1}
                style={{ paddingLeft: isMobile ? '0' : '4rem' }} // Added padding to the left on desktop
              >
                <Icon
                  name={'viewport-wide'}
                  style={{
                    marginRight: '2rem',
                    backgroundColor: 'rgb(255, 204, 204)',
                    borderRadius: '50%',
                  }}
                />
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                >
                  <Typography
                    variant="h6"
                    align="center"
                    style={{ fontWeight: 'bold' }}
                  >
                    Wider Availability
                  </Typography>
                  <Typography variant="subtitle1" align="left">
                    With our service, you can access a wider pool of
                    unvaccinated blood donors, increasing the chances of finding
                    a compatible match.
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              flexBasis={isMobile ? '100%' : '50%'}
              id="whyImageSection"
            >
              <img
                src={womanDonorImage}
                alt="New Section Image"
                style={{
                  width: isMobile ? '100%' : '650px',
                  height: 'auto',
                  objectFit: 'cover',
                  borderRadius: '15px',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;
