import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  Avatar,
  Typography,
  Select,
  SelectChangeEvent,
  MenuItem,
  InputLabel,
  FormControl,
  Input,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

import { Layout as DashboardLayout } from 'src/layout/dashboard/layout';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import faceImage from '../../assets/imgs/face/face-0.jpg';

const UserProfile: React.FC = () => {
  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader title="Edit Profile" />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel>First Name</InputLabel>
                      <Input type="text" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel>Last Name</InputLabel>
                      <Input type="text" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel>Blood Type</InputLabel>
                      <Select
                        onChange={(event: SelectChangeEvent) => {
                          console.log(event.target.value);
                        }}
                      >
                        <MenuItem value="A+">A+</MenuItem>
                        <MenuItem value="A-">A-</MenuItem>
                        <MenuItem value="B+">B+</MenuItem>
                        <MenuItem value="B-">B-</MenuItem>
                        <MenuItem value="AB+">AB+</MenuItem>
                        <MenuItem value="AB-">AB-</MenuItem>
                        <MenuItem value="O+">O+</MenuItem>
                        <MenuItem value="O-">O-</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      {/* <InputLabel>Date of Last Donation</InputLabel> */}
                      <DatePicker />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel>Location</InputLabel>
                      <Input type="text" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel>Contact Information</InputLabel>
                      <Input type="text" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel>Medical History</InputLabel>
                      <Input type="text" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel>Age</InputLabel>
                      <Input type="number" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel>Weight</InputLabel>
                      <Input type="number" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel>Gender</InputLabel>
                      <Select>
                        {/* Add dropdown options for gender here */}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel>Donation Preferences</InputLabel>
                      <Input type="text" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel>Availability</InputLabel>
                      <Input type="text" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Consent for Future Contact"
                    />
                  </Grid>
                </Grid>
                <Button variant="contained" color="primary">
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  alt="User Avatar"
                  src={faceImage}
                  style={{ width: '20%', height: 'auto' }}
                />
                <Typography variant="h5">Mike Andrew</Typography>
                <Typography variant="subtitle1">michael24</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
};

export default UserProfile;
