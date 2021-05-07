import value from '../assets/scss/_themes-vars.module.scss';

/**
 * Color intention that you want to used in your theme
 */
export function themePalatte(navObject) {
    return {
        mode: navObject.customization.navType,
        common: {
            black: value.paperDark
        },
        primary: {
            light: value.blue50,
            main: value.blue500,
            dark: value.blue600,
            200: value.blue200,
            800: value.blue800
        },
        secondary: {
            light: value.deepPurple50,
            main: value.deepPurple500,
            dark: value.deepPurple600,
            200: value.deepPurple200,
            800: value.deepPurple800
        },
        purple: {
            light: value.deepPurple50,
            main: value.deepPurple500,
            dark: value.deepPurple600,
            200: value.deepPurple200,
            800: value.deepPurple800
        },
        error: {
            light: value.red200,
            main: value.red500,
            dark: value.red800
        },
        orange: {
            light: value.deepOrange50,
            main: value.deepOrange200,
            dark: value.deepOrange800
        },
        warning: {
            light: value.amber50,
            main: value.amber100,
            dark: value.amber500
        },
        success: {
            light: value.A100,
            main: value.A200,
            dark: value.A700
        },
        grey: {
            50: value.grey50,
            100: value.grey100,
            500: navObject.textSecondary,
            600: navObject.textPrimary,
            900: navObject.textDark
        },
        text: {
            primary: navObject.textPrimary,
            secondary: navObject.textSecondary,
            dark: navObject.textDark,
            hint: value.grey100
        },
        background: {
            paper: navObject.paper,
            default: navObject.backgroundDefault
        }
    };
}
