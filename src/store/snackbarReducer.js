import * as actionTypes from './actions';

const initialState = {
    action: false,
    open: false,
    message: 'Note archived',
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
    },
    variant: 'default',
    alertSeverity: 'success',
    transition: 'Fade',
    close: true,
    actionButton: false
};

const snackbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SNACKBAR_OPEN:
            return {
                ...state,
                action: !state.action,
                open: action.open ? action.open : initialState.open,
                message: action.message ? action.message : initialState.message,
                anchorOrigin: action.anchorOrigin ? action.anchorOrigin : initialState.anchorOrigin,
                variant: action.variant ? action.variant : initialState.variant,
                alertSeverity: action.alertSeverity ? action.alertSeverity : initialState.alertSeverity,
                transition: action.transition ? action.transition : initialState.transition,
                close: action.close === false ? action.close : initialState.close,
                actionButton: action.actionButton ? action.actionButton : initialState.actionButton
            };
        default:
            return state;
    }
};

export default snackbarReducer;
