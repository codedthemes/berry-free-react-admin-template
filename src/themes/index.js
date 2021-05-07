import {createMuiTheme} from '@material-ui/core/styles';
import value from '../assets/scss/_themes-vars.module.scss';
import {componentStyleOverrides} from './compStyleOverride';
import {themePalatte} from './palatte';
import {themeTypography} from './typography';

export function theme(customization) {
    let navObject = {
        paper: '',
        backgroundDefault: '',
        background: '',
        textPrimary: '',
        textSecondary: '',
        textDark: '',
        menuSelected: '',
        menuSelectedBack: '',
        divider: '',
        customization: customization
    };

    switch (customization.navType) {
        case 'light':
        default:
            navObject.paper = value.paper;
            navObject.backgroundDefault = value.paper;
            navObject.background = value.blue50;
            navObject.textPrimary = value.grey700;
            navObject.textSecondary = value.grey500;
            navObject.textDark = value.grey900;
            navObject.menuSelected = value.deepPurple600;
            navObject.menuSelectedBack = value.blue50;
            navObject.divider = value.grey200;
            break;
    }

    return createMuiTheme({
        direction: customization.rtlLayout ? 'rtl' : 'ltr',
        palette: themePalatte(navObject),
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px'
                }
            }
        },
        typography: themeTypography(navObject),
        components: componentStyleOverrides(navObject)
    });
}

export default theme;
