import * as actionTypes from './actions';
import config from '../config';

export const initialState = {
    isOpen: 'dashboard', //for active default menu
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    navType: config.theme,
    locale: config.i18n,
    rtlLayout: false, // rtlLayout: config.rtlLayout,
    opened: true
};

const customizationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MENU_OPEN:
            return {
                ...state,
                isOpen: action.isOpen
            };
        case actionTypes.MENU_TYPE:
            return {
                ...state,
                navType: action.navType
            };
        case actionTypes.THEME_LOCALE:
            return {
                ...state,
                locale: action.locale
            };
        case actionTypes.THEME_RTL:
            return {
                ...state,
                rtlLayout: action.rtlLayout
            };
        case actionTypes.SET_MENU:
            return {
                ...state,
                opened: action.opened
            };
        case actionTypes.SET_FONT_FAMILY:
            return {
                ...state,
                fontFamily: action.fontFamily
            };
        case actionTypes.SET_BORDER_RADIUS:
            return {
                ...state,
                borderRadius: action.borderRadius
            };
        default:
            return state;
    }
};

export default customizationReducer;
