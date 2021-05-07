import React from 'react';
import {useSelector} from 'react-redux';
import {Alert, Button, Fade, Grow, IconButton, Slide} from '@material-ui/core';
import MuiSnackbar from '@material-ui/core/Snackbar';

import CloseIcon from '@material-ui/icons/Close';

function TransitionSlideLeft(props) {
    return <Slide {...props} direction="left" />;
}

function TransitionSlideUp(props) {
    return <Slide {...props} direction="up" />;
}

function TransitionSlideRight(props) {
    return <Slide {...props} direction="right" />;
}

function TransitionSlideDown(props) {
    return <Slide {...props} direction="down" />;
}

function GrowTransition(props) {
    return <Grow {...props} />;
}

const transition = {
    SlideLeft: TransitionSlideLeft,
    SlideUp: TransitionSlideUp,
    SlideRight: TransitionSlideRight,
    SlideDown: TransitionSlideDown,
    Grow: GrowTransition,
    Fade: Fade
};

const Snackbar = (props) => {
    const [open, setOpen] = React.useState(false);
    const snackbarInitial = useSelector((state) => state.snackbar);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    React.useEffect(() => {
        setOpen(snackbarInitial.open);
    }, [snackbarInitial.action, snackbarInitial.open]);

    return (
        <React.Fragment>
            {snackbarInitial.variant === 'default' && (
                <MuiSnackbar
                    anchorOrigin={snackbarInitial.anchorOrigin}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={snackbarInitial.message}
                    TransitionComponent={transition[snackbarInitial.transition]}
                    action={
                        <React.Fragment>
                            <Button color="secondary" size="small" onClick={handleClose}>
                                UNDO
                            </Button>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                />
            )}
            {snackbarInitial.variant === 'alert' && (
                <MuiSnackbar
                    TransitionComponent={transition[snackbarInitial.transition]}
                    anchorOrigin={snackbarInitial.anchorOrigin}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                    <Alert
                        variant="filled"
                        severity={snackbarInitial.alertSeverity}
                        sx={{
                            bgcolor: snackbarInitial.alertSeverity + '.dark',
                            color: snackbarInitial.alertSeverity === 'warning' ? 'grey.900' : ''
                        }}
                        action={
                            <React.Fragment>
                                {snackbarInitial.actionButton !== false && (
                                    <Button color="secondary" size="small" onClick={handleClose}>
                                        UNDO
                                    </Button>
                                )}
                                {snackbarInitial.close !== false && (
                                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                )}
                            </React.Fragment>
                        }
                    >
                        {snackbarInitial.message}
                    </Alert>
                </MuiSnackbar>
            )}
        </React.Fragment>
    );
};

export default Snackbar;
