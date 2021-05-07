import {combineReducers} from 'redux';
import customizationReducer from './customizationReducer';
import snackbarReducer from './snackbarReducer';

const reducer = combineReducers({
    customization: customizationReducer,
    snackbar: snackbarReducer
});

export default reducer;
