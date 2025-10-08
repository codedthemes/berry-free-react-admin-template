import React, { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// ===============================|| FASTAPI DEMO POST ||=============================== //

export default function FastApiDemoPost() {
  const theme = useTheme();

  // State for hello message form
  const [helloMessage, setHelloMessage] = useState('');
  const [helloResponse, setHelloResponse] = useState(null);
  const [helloError, setHelloError] = useState('');

  // State for user form
  const [userName, setUserName] = useState('');
  const [userResponse, setUserResponse] = useState(null);
  const [userError, setUserError] = useState('');

  // Handle hello message submission
  const handleHelloSubmit = async (e) => {
    e.preventDefault();
    setHelloError('');
    setHelloResponse(null);

    try {
      const response = await fetch('http://localhost:8000/api/hello', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: helloMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to post hello message');
      }

      const data = await response.json();
      setHelloResponse(data);
      setHelloMessage(''); // Clear the form
    } catch (err) {
      setHelloError('Failed to post hello message: ' + err.message);
    }
  };

  // Handle user submission
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setUserError('');
    setUserResponse(null);

    try {
      const response = await fetch('http://localhost:8000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: userName }),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const data = await response.json();
      setUserResponse(data);
      setUserName(''); // Clear the form
    } catch (err) {
      setUserError('Failed to create user: ' + err.message);
    }
  };

  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 3 }}>
        FastAPI Demo POST
      </Typography>

      <Grid container spacing={3}>
        {/* Hello Message Form */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h3" sx={{ mb: 2 }}>
                Post Hello Message
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                POST to /api/hello endpoint
              </Typography>

              <form onSubmit={handleHelloSubmit}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="hello-message">Message</InputLabel>
                  <OutlinedInput
                    id="hello-message"
                    type="text"
                    value={helloMessage}
                    onChange={(e) => setHelloMessage(e.target.value)}
                    name="message"
                    label="Message"
                    required
                  />
                </FormControl>

                <Box sx={{ mt: 2 }}>
                  <AnimateButton>
                    <Button
                      disableElevation
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Send Hello
                    </Button>
                  </AnimateButton>
                </Box>
              </form>

              {helloError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {helloError}
                </Alert>
              )}

              {helloResponse && (
                <Box sx={{ mt: 3 }}>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="h4" sx={{ mb: 1 }}>
                    Response:
                  </Typography>
                  <Alert severity="success">
                    <pre style={{ margin: 0, fontSize: '0.875rem' }}>
                      {JSON.stringify(helloResponse, null, 2)}
                    </pre>
                  </Alert>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* User Creation Form */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h3" sx={{ mb: 2 }}>
                Add User
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                POST to /api/users endpoint
              </Typography>

              <form onSubmit={handleUserSubmit}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="user-name">Name</InputLabel>
                  <OutlinedInput
                    id="user-name"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    name="name"
                    label="Name"
                    required
                  />
                </FormControl>

                <Box sx={{ mt: 2 }}>
                  <AnimateButton>
                    <Button
                      disableElevation
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="secondary"
                    >
                      Create User
                    </Button>
                  </AnimateButton>
                </Box>
              </form>

              {userError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {userError}
                </Alert>
              )}

              {userResponse && (
                <Box sx={{ mt: 3 }}>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="h4" sx={{ mb: 1 }}>
                    Response:
                  </Typography>
                  <Alert severity="success">
                    <pre style={{ margin: 0, fontSize: '0.875rem' }}>
                      {JSON.stringify(userResponse, null, 2)}
                    </pre>
                  </Alert>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
