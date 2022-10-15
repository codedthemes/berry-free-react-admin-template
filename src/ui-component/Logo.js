// material-ui
// import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */
import { Grid } from '@mui/material';
import MuiTypography from '@mui/material/Typography';

import logo from 'assets/images/motion.png';

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    return (
        <div>
            <Grid container spacing={1} direction="row" justifyContent="center" alignItems="center">
                <Grid item xs>
                    <img src={logo} alt="Motion" width="40" />
                </Grid>
                <Grid item xs>
                    <MuiTypography variant="h3" gutterBottom>
                        Motion
                    </MuiTypography>
                </Grid>
            </Grid>
        </div>
    );
};

export default Logo;
