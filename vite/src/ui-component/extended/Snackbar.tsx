import { SyntheticEvent } from 'react';

// material-ui
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import Slide, { SlideProps } from '@mui/material/Slide';
import MuiSnackbar from '@mui/material/Snackbar';

// assets
import CloseIcon from '@mui/icons-material/Close';

import { KeyedObject } from 'types';
import { useDispatch, useSelector } from '../../store';
import { closeSnackbar } from '../../store/slices/snackbar';

// animation function
function TransitionSlideLeft(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

function TransitionSlideUp(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

function TransitionSlideRight(props: SlideProps) {
  return <Slide {...props} direction="right" />;
}

function TransitionSlideDown(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

function GrowTransition(props: SlideProps) {
  return <Grow {...props} />;
}

// animation options
const animation: KeyedObject = {
  SlideLeft: TransitionSlideLeft,
  SlideUp: TransitionSlideUp,
  SlideRight: TransitionSlideRight,
  SlideDown: TransitionSlideDown,
  Grow: GrowTransition,
  Fade
};

// ==============================|| SNACKBAR ||============================== //

export default function Snackbar() {
  const dispatch = useDispatch();
  const snackbar = useSelector((state) => state.snackbar);
  const { actionButton, anchorOrigin, alert, close, message, open, transition, variant, severity } = snackbar;

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeSnackbar());
  };

  return (
    <>
      {/* default snackbar */}
      {variant === 'default' && (
        <MuiSnackbar
          anchorOrigin={anchorOrigin}
          open={open}
          autoHideDuration={1500}
          onClose={handleClose}
          message={message}
          slots={{ transition: animation[transition] }}
          action={
            <>
              <Button size="small" onClick={handleClose}>
                UNDO
              </Button>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose} sx={{ mt: 0.25, mb: 0.5 }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          }
        />
      )}

      {/* alert snackbar */}
      {variant === 'alert' && (
        <MuiSnackbar
          slots={{ transition: animation[transition] }}
          anchorOrigin={anchorOrigin}
          open={open}
          autoHideDuration={1500}
          onClose={handleClose}
        >
          <Alert
            severity={severity}
            variant={alert.variant}
            color={alert.color}
            action={
              <>
                {actionButton !== false && (
                  <Button
                    size="small"
                    onClick={handleClose}
                    sx={{
                      color: alert.color === 'success' || alert.color === 'warning' ? 'common.black' : 'common.white'
                    }}
                  >
                    UNDO
                  </Button>
                )}
                {close !== false && (
                  <IconButton
                    sx={{
                      color: alert.color === 'success' || alert.color === 'warning' ? 'common.black' : 'common.white'
                    }}
                    size="small"
                    aria-label="close"
                    onClick={handleClose}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              </>
            }
            sx={{
              '.MuiAlert-action': { mb: 0.5 },
              ...(alert.variant === 'outlined' && {
                bgcolor: 'background.paper'
              })
            }}
          >
            {message}
          </Alert>
        </MuiSnackbar>
      )}
    </>
  );
}
