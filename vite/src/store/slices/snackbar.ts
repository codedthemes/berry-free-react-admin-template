import { createSlice } from '@reduxjs/toolkit';

// types
import { SnackbarProps } from 'types/snackbar';

const initialState: SnackbarProps = {
  action: false,
  open: false,
  message: 'Note archived',
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right'
  },
  severity: 'success',
  variant: 'default',
  alert: {
    color: 'primary',
    variant: 'filled'
  },
  transition: 'Fade',
  close: true,
  maxStack: 3,
  dense: false,
  iconVariant: 'usedefault',
  actionButton: false,
  hideIconVariant: false
};

// ==============================|| SLICE - SNACKBAR ||============================== //

const snackbar = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar(state, action) {
      const { open, message, anchorOrigin, variant, alert, transition, close, actionButton, severity, hideIconVariant } = action.payload;

      state.action = !state.action;
      state.open = open || initialState.open;
      state.message = message || initialState.message;
      state.anchorOrigin = anchorOrigin || initialState.anchorOrigin;
      state.variant = variant || initialState.variant;
      state.alert = {
        color: alert?.color || initialState.alert.color,
        variant: alert?.variant || initialState.alert.variant
      };
      state.severity = severity || initialState.severity;
      state.transition = transition || initialState.transition;
      state.close = close === false ? close : initialState.close;
      state.actionButton = actionButton || initialState.actionButton;
      state.hideIconVariant = hideIconVariant === undefined ? initialState.hideIconVariant : hideIconVariant;
    },

    closeSnackbar(state) {
      state.open = false;
    },

    handlerDense(state, action) {
      const { dense } = action.payload;
      state.dense = dense;
    },

    handlerIncrease(state, action) {
      const { maxStack } = action.payload;
      state.maxStack = maxStack;
    },

    handlerIconVariants(state, action) {
      const { iconVariant, hideIconVariant } = action.payload;
      state.iconVariant = iconVariant || initialState.iconVariant;
      state.hideIconVariant = hideIconVariant === undefined ? initialState.hideIconVariant : hideIconVariant;
    }
  }
});

export default snackbar.reducer;

export const { closeSnackbar, openSnackbar, handlerDense, handlerIconVariants, handlerIncrease } = snackbar.actions;
