import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import FontFamily from './FontFamily';
import BorderRadius from './BorderRadius';

import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import { IconSettings } from '@tabler/icons-react';
// ==============================|| LIVE CUSTOMIZATION ||============================== //

export default function Customization() {
  const theme = useTheme();

  // drawer on/off
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* toggle button */}
      <Tooltip title="Live Customize">
        <Fab
          component="div"
          onClick={handleToggle}
          size="medium"
          variant="circular"
          color="secondary"
          sx={{
            borderRadius: 0,
            borderTopLeftRadius: '50%',
            borderBottomLeftRadius: '50%',
            borderTopRightRadius: '50%',
            borderBottomRightRadius: '4px',
            top: '25%',
            position: 'fixed',
            right: 10,
            zIndex: 1200,
            boxShadow: theme.customShadows.secondary
          }}
        >
          <AnimateButton type="rotate">
            <IconButton color="inherit" size="large" disableRipple aria-label="live customize">
              <IconSettings />
            </IconButton>
          </AnimateButton>
        </Fab>
      </Tooltip>
      <Drawer anchor="right" onClose={handleToggle} open={open} slotProps={{ paper: { sx: { width: 280 } } }}>
        <PerfectScrollbar>
          <Grid container spacing={2}>
            <Grid size={12}>
              {/* font family */}
              <FontFamily />
              <Divider />
            </Grid>
            <Grid size={12}>
              {/* border radius */}
              <BorderRadius />
              <Divider />
            </Grid>
          </Grid>
        </PerfectScrollbar>
      </Drawer>
    </>
  );
}
