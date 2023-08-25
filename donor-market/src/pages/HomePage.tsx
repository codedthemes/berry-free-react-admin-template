import Navbar from '../components/Navbar/Navbar';
import donorHandsImage from '../assets/icons/donor-hands.jpeg';
import womanDonorImage from '../assets/icons/woman-donor.jpeg';
import bloodSafeImage from '../assets/icons/blood-safe.png';
import aboutUsImage from '../assets/icons/about-us.jpeg';
import { useTheme, useMediaQuery } from '@mui/material';
import {
  Typography,
  Button,
  Box,
  Divider,
  CardContent,
  Grid,
  Card,
} from '@mui/material';
import Icon from '../components/Icon/Icon';
import { gridSpacing } from '../store/constant';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

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
        {/* Get Started Section */}
        <Box my={4}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: '10px' }}
            onClick={() => navigate('/login')}
          >
            Get Started
          </Button>
          <Button variant="outlined" color="primary">
            Learn More
          </Button>
        </Box>
        {/* Hands image*/}
        <Box my={5}>
          <img
            src={donorHandsImage}
            alt="Donor Hands"
            style={{
              width: isMobile ? '100%' : '80vw', // Changed width for desktop to vw
              height: 'auto',
              objectFit: 'cover',
              borderRadius: '15px', // Added rounded corners for all resolutions
            }}
          />
        </Box>
        {/* Why Section */}
        <Box display="flex" my={5} py={4}>
          <Box
            display="flex"
            flexDirection={isMobile ? 'column' : 'row'}
            id="whySection"
          >
            <Box
              display="flex"
              flexDirection="column"
              flexBasis={isMobile ? '100%' : '50%'}
              id="whyTextSection"
              justifyContent="center" // Added to center the image vertically
              alignItems="center" // Added to center the image horizontally
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
                    Reduced Risk
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
              justifyContent="center" // Added to center the image vertically
              alignItems="center" // Added to center the image horizontally
            >
              <img
                src={womanDonorImage}
                alt="New Section Image"
                style={{
                  width: isMobile ? '100%' : '40vw', // Changed width for desktop to vw
                  height: 'auto',
                  objectFit: 'cover',
                  borderRadius: '15px',
                }}
              />
            </Box>
          </Box>
        </Box>
        {/* Safe Section */}
        <Box
          display="flex"
          flexDirection={isMobile ? 'column' : 'row'}
          id="safeSection"
        >
          <Box
            display={isMobile ? 'none' : 'flex'}
            flexDirection="column"
            flexBasis="50%"
            id="safeImageSection"
            justifyContent="center" // Added to center the image vertically
            alignItems="center" // Added to center the image horizontally
          >
            <img
              src={bloodSafeImage}
              alt="New Section Image"
              style={{
                width: isMobile ? '100%' : '35vw', // Changed width for desktop to vw
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '15px',
              }}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            flexBasis={isMobile ? '100%' : '50%'}
            id="safeTextSection"
            justifyContent="center" // Added to center the image vertically
            alignItems="center" // Added to center the image horizontally
          >
            <Typography
              variant="h4"
              gutterBottom
              style={{ fontWeight: 'bold' }}
            >
              Safe and Reliable Donations
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              We prioritize safety and reliability in every step of the blood
              donation process.
            </Typography>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              my={1}
              style={{ paddingLeft: isMobile ? '0' : '4rem' }} // Added padding to the left on desktop
            >
              <Icon
                name={'checkup-list'}
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
                  Stringent Screening
                </Typography>
                <Typography variant="subtitle1" align="left">
                  Our donors undergo a thorough screening process to ensure
                  their eligibility and the safety of the donated blood.
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
                name={'antenna-bars'}
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
                  Strict Quality Control
                </Typography>
                <Typography variant="subtitle1" align="left">
                  We adhere to strict quality control measures to ensure that
                  the blood donations meet the highest standards of safety and
                  efficacy.
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
                name={'lock'}
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
                  Secure and Confidential
                </Typography>
                <Typography variant="subtitle1" align="left">
                  Your personal information and medical history are kept secure
                  and confidential, ensuring privacy throughout the donation
                  process.
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            display={isMobile ? 'flex' : 'none'}
            flexDirection="column"
            flexBasis="100%"
            id="mobileSafeImageSection"
            justifyContent="center" // Added to center the image vertically
            alignItems="center" // Added to center the image horizontally
          >
            <img
              src={bloodSafeImage}
              alt="New Section Image"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '15px',
              }}
            />
          </Box>
        </Box>
        {/* Sponsors */}
        <Box
          display="flex"
          flexDirection="column"
          id="sponsors"
          mt={5}
          alignItems={'center'}
        >
          <Typography variant="subtitle1" gutterBottom>
            Join the growing list of organizations and individuals benefiting
            from our unvaccinated blood donor network.
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            mt={2}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              flexBasis={'33%'}
            >
              <Icon
                name={'hospital'}
                style={{
                  marginBottom: isMobile ? '1rem' : '0',
                  borderRadius: '50%',
                }}
              />
              <Typography
                variant="subtitle1"
                align="center"
                style={{ fontWeight: 'bold' }}
              >
                Nationwide Children's Hospital
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection={isMobile ? 'column' : 'row'}
              alignItems="center"
              justifyContent="center"
              flexBasis={'33%'}
            >
              <Icon
                name={'device-heart'}
                style={{
                  marginBottom: isMobile ? '1rem' : '0',
                  borderRadius: '50%',
                }}
              />
              <Typography
                variant="subtitle1"
                align="center"
                style={{ fontWeight: 'bold' }}
              >
                Ohio University
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection={isMobile ? 'column' : 'row'}
              alignItems="center"
              justifyContent="center"
              flexBasis={'33%'}
            >
              <Icon
                name={'blood-cross'}
                style={{
                  marginBottom: isMobile ? '1rem' : '0',
                  borderRadius: '50%',
                }}
              />
              <Typography
                variant="subtitle1"
                align="center"
                style={{ fontWeight: 'bold' }}
              >
                American Red Cross
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* About Section */}
        <Box
          display="flex"
          flexDirection="row"
          id="aboutSection"
          mt={5}
          alignItems={'center'}
        >
          <Box
            display="flex"
            flexDirection={isMobile ? 'column' : 'row'}
            alignItems="center"
            justifyContent="center"
          >
            <Box
              display="flex"
              flexDirection="column"
              flexBasis={isMobile ? '100%' : '50%'} // Set width to 50% on desktop
              alignItems={isMobile ? 'center' : 'flex-start'}
              justifyContent="center"
              style={{
                padding: isMobile ? '0' : '8rem',
                paddingRight: isMobile ? '0' : '6rem',
              }} // Increased padding to the left on desktop
            >
              <Typography
                variant={'h4'}
                gutterBottom
                style={{
                  fontWeight: 'bold',
                  textAlign: isMobile ? 'center' : 'left',
                }}
              >
                About Our Service
              </Typography>
              <Typography
                variant={isMobile ? 'subtitle1' : 'body1'}
                gutterBottom
                style={{ textAlign: isMobile ? 'center' : 'left' }}
              >
                Our service is dedicated to connecting individuals in need of
                unvaccinated blood donors with willing donors. We aim to bridge
                the gap and ensure a steady supply of unvaccinated blood for
                transfusions. Join us in our mission to save lives and make a
                positive impact. Sign up now and start finding unvaccinated
                blood donors!
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              flexBasis={isMobile ? '100%' : '50%'} // Set width to 50% on desktop
              justifyContent="center" // Added to center the image vertically
              alignItems="center" // Added to center the image horizontally
            >
              <img
                src={aboutUsImage}
                alt="About Us Image"
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
        {/* Ready to make difference section */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          style={{
            width: '100vw',
            position: 'relative',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            height: '40vh',
            backgroundColor: 'rgba(204, 0, 0, 1)',
            color: '#fff',
          }}
          my={5}
        >
          <Typography
            variant={isMobile ? 'h4' : 'h2'}
            style={{ fontWeight: 'bold' }}
          >
            Ready to make a difference?
          </Typography>
          <Typography variant="subtitle1">
            Sign up today and gain access to our extensive network of
            unvaccinated blood donors.
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            mt={2}
          >
            <Box
              display="flex"
              flexDirection={isMobile ? 'column' : 'row'}
              justifyContent="center"
              alignItems="center"
            >
              <Button
                variant="outlined"
                style={{
                  marginRight: isMobile ? '0' : '10px',
                  marginBottom: isMobile ? '10px' : '0',
                  color: '#fff',
                  borderColor: '#fff',
                }}
              >
                Learn More
              </Button>
              <Button
                variant="outlined"
                style={{
                  color: '#fff',
                  borderColor: '#fff',
                  marginTop: isMobile ? '10px' : '0',
                }}
              >
                Get Started
              </Button>
            </Box>
          </Box>
        </Box>
        {/* Pricing plans */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mt={5}
        >
          <Typography variant="h4" style={{ fontWeight: 'bold' }}>
            Plan that fits everyones need
          </Typography>
          <Typography variant="subtitle1">
            Simple transparent pricing.Try any plan absolutely free for 30 days
          </Typography>
          <Box
            display="flex"
            flexDirection={isMobile ? 'column' : 'row'}
            justifyContent="center"
            alignItems="center"
            mt={2}
          >
            {/* Pricing Cards */}
            <Box
              display="flex"
              alignItems="stretch"
              style={{
                margin: '10px',
                width: isMobile ? '100%' : 'calc(25% - 20px)', // Adjusted width to account for margin
              }}
            >
              <Card
                style={{
                  display: 'flex', // Added this line
                  flexDirection: 'column', // Added this line
                  width: '100%',
                  height: '100%',
                  marginBottom: isMobile ? '20px' : '40px', // Increased spacing between cards on desktop
                  textAlign: 'left',
                }}
              >
                <CardContent>
                  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                      <Typography
                        variant="h6"
                        style={{ fontWeight: 'bold', textAlign: 'left' }}
                      >
                        Basic Plan
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        style={{ textAlign: 'left' }}
                      >
                        Basic Features
                      </Typography>
                      <Typography
                        variant="h2"
                        style={{ fontWeight: 'bold', textAlign: 'left' }}
                      >
                        $100{' '}
                        <span
                          style={{ fontWeight: 'normal', fontSize: '0.9rem' }}
                        >
                          year
                        </span>
                      </Typography>
                      <Button
                        style={{ marginTop: '10px' }}
                        variant="contained"
                        color="primary"
                      >
                        Start Free Trial
                      </Button>
                      <Divider style={{ margin: '10px 0' }} />
                      <Typography
                        variant="body1"
                        style={{ textAlign: 'left', marginBottom: '10px' }}
                      >
                        {' '}
                        Search for and connect with unvaccinated blood donors.
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{ textAlign: 'left', marginBottom: '10px' }}
                      >
                        {' '}
                        Users can connect with a 5 donors per month.
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{ textAlign: 'left', marginBottom: '10px' }}
                      >
                        {' '}
                        Users can view basic health information of potential
                        donors.
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{ textAlign: 'left', marginBottom: '10px' }}
                      >
                        {' '}
                        Access to email support.
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{ textAlign: 'left', marginBottom: '10px' }}
                      >
                        {' '}
                        Email notifications on new donors and relevant updates.
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
            <Box
              display="flex"
              alignItems="stretch"
              style={{
                margin: '10px',
                width: isMobile ? '100%' : 'calc(25% - 20px)', // Adjusted width to account for margin
              }}
            >
              <Card
                style={{
                  display: 'flex', // Added this line
                  flexDirection: 'column', // Added this line
                  width: '100%',
                  height: '100%',
                  marginBottom: isMobile ? '20px' : '40px', // Increased spacing between cards on desktop
                  textAlign: 'left',
                }}
              >
                <CardContent>
                  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                      <Typography
                        variant="h6"
                        style={{ fontWeight: 'bold', textAlign: 'left' }}
                      >
                        Premium Plan
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        style={{ textAlign: 'left' }}
                      >
                        Priority Approval
                      </Typography>
                      <Typography
                        variant="h2"
                        style={{ fontWeight: 'bold', textAlign: 'left' }}
                      >
                        $500{' '}
                        <span
                          style={{ fontWeight: 'normal', fontSize: '0.9rem' }}
                        >
                          year
                        </span>
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '10px' }}
                      >
                        Get Started
                      </Button>
                      <Divider style={{ margin: '10px 0' }} />

                      <Typography
                        variant="body1"
                        style={{ textAlign: 'left', marginBottom: '10px' }}
                      >
                        {' '}
                        All features of the Basic Plan.
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{ textAlign: 'left', marginBottom: '10px' }}
                      >
                        {' '}
                        Users can connect with an unlimited number of donors per
                        month
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{ textAlign: 'left', marginBottom: '10px' }}
                      >
                        {' '}
                        Users can view comprehensive health information of
                        potential donors, such as more detailed medical history,
                        lifestyle habits, etc.
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{ textAlign: 'left', marginBottom: '10px' }}
                      >
                        {' '}
                        Use of an algorithm to suggest potential donors based on
                        user's preferences and compatibility.
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;
