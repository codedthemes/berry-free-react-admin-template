// next
import RouterLink from 'next/link';

// material-ui
import Link from '@mui/material/Link';

// project imports
import { DASHBOARD_PATH } from 'config';
import Logo from 'ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

export default function LogoSection() {
  return (
    <Link component={RouterLink} href={DASHBOARD_PATH} aria-label="theme-logo">
      <Logo />
    </Link>
  );
}
