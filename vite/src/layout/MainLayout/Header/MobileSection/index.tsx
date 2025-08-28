import { useEffect, useRef, useState } from 'react';

// material-ui
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

// project imports
import LocalizationSection from '../LocalizationSection';
import Transitions from 'ui-component/extended/Transitions';

// assets
import { IconDotsVertical } from '@tabler/icons-react';

// ==============================|| MOBILE HEADER ||============================== //

export default function MobileSection() {
  const [open, setOpen] = useState(false);

  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef<any>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Box component="span" ref={anchorRef} sx={{ mt: 1, ml: 1 }}>
        <IconButton sx={{ color: 'text.primary', ml: 0.5, cursor: 'pointer' }} onClick={handleToggle}>
          <IconDotsVertical
            stroke={1.5}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            style={{ fontSize: '1.5rem' }}
          />
        </IconButton>
      </Box>

      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        style={{ width: '100%', zIndex: 1 }}
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 30]
            }
          }
        ]}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Transitions type="zoom" in={open} {...TransitionProps} sx={{ transformOrigin: 'top right' }}>
              <Paper>
                {open && (
                  <AppBar color="inherit">
                    <Toolbar sx={{ py: 2.75 }}>
                      <LocalizationSection />
                    </Toolbar>
                  </AppBar>
                )}
              </Paper>
            </Transitions>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
}
