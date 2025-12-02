import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', pt: 3, mt: 'auto' }}>
      <Typography variant="caption">
        &copy; All rights reserved{' '}
        <Typography component={Link} href="https://codedthemes.com" underline="hover" target="_blank" sx={{ color: 'secondary.main' }}>
          CodedThemes
        </Typography>
      </Typography>
      <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center', justifyContent: 'space-between' }}>
        <Link
          component={RouterLink}
          to="https://mui.com/store/license/"
          underline="hover"
          target="_blank"
          variant="caption"
          color="text.primary"
        >
          License
        </Link>
        <Link
          component={RouterLink}
          to="https://codedthemes.com/hire-us/"
          underline="hover"
          target="_blank"
          variant="caption"
          color="text.primary"
        >
          Hire us
        </Link>
        <Link
          component={RouterLink}
          to="https://mui.com/store/terms/"
          underline="hover"
          target="_blank"
          variant="caption"
          color="text.primary"
        >
          Terms
        </Link>
        <Link
          component={RouterLink}
          to="https://links.codedthemes.com/dAAOP"
          underline="hover"
          target="_blank"
          variant="caption"
          color="text.primary"
        >
          Figma Design System
        </Link>
      </Stack>
    </Stack>
  );
}
