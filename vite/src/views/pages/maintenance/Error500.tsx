import { Link } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import { DASHBOARD_PATH } from '../../config';
import AnimateButton from '../ui-component/extended/AnimateButton';
import { gridSpacing } from '../store/constant';

// assets
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import error500 from 'assets/images/maintenance/500-error.svg';

// ==============================|| ERROR PAGE ||============================== //

export default function Error() {
  return (
    <Stack sx={{ gap: gridSpacing, alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Box sx={{ width: { xs: 350, sm: 396 } }}>
        <CardMedia component="img" src={error500} alt="mantis" style={{ height: '100%', width: '100%' }} />
      </Box>
      <Stack spacing={gridSpacing} sx={{ justifyContent: 'center', alignItems: 'center', p: 1.5 }}>
        <Typography variant="h1">Internal Server Error</Typography>
        <Typography variant="body2" align="center">
          Server error 500. we fixing the problem. please try again at a later stage.
        </Typography>
        <AnimateButton>
          <Button variant="contained" size="large" component={Link} to={DASHBOARD_PATH}>
            <HomeTwoToneIcon sx={{ fontSize: '1.3rem', mr: 0.75 }} /> Home
          </Button>
        </AnimateButton>
      </Stack>
    </Stack>
  );
}
