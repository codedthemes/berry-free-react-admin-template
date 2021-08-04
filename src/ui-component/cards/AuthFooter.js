import React from 'react';

// material-ui
import { Link, Typography, Stack } from '@material-ui/core';

// ===========================|| FOOTER - AUTHENTICATION 2 & 3 ||=========================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="https://berrydashboard.io" target="_blank" underline="hover">
            berrydashboard.io
        </Typography>
        <Typography variant="subtitle2" component={Link} href="https://codedthemes.com" target="_blank" underline="hover">
            &copy; codedthemes.com
        </Typography>
    </Stack>
);

export default AuthFooter;
