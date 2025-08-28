// project imports
import { MenuOrientation, ThemeDirection, ThemeMode } from '../../config';

export type FontFamily = `'Inter', sans-serif` | `'Poppins', sans-serif` | `'Roboto', sans-serif`;
export type PresetColor = 'default' | 'theme1' | 'theme2' | 'theme3' | 'theme4' | 'theme5' | 'theme6';
export type I18n = 'en' | 'fr' | 'ro' | 'zh'; // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese

export type ConfigProps = {
  /**
   * the props used for menu orientation (diffrent theme layout).
   * we provide static below options -
   * 'vertical' (default) - MenuOrientation.VERTICAL
   * 'horizontal' - MenuOrientation.HORIZONTAL
   */
  menuOrientation: MenuOrientation;

  /**
   * the props used for show mini variant drawer
   * the mini variant is recommended for apps sections that need quick selection access alongside content.
   * default - false
   */
  miniDrawer: boolean;

  /**
   * The props used for the theme font-style.
   * We provide static below options -
   * `'Inter', sans-serif`
   * `'Poppins', sans-serif`
   * `'Roboto', sans-serif` (default)
   */
  fontFamily: FontFamily;

  /**
   * the props used for change globaly card border radius.
   * We provide dynamic number values for border radius -
   * default value - 8
   */
  borderRadius: number;

  /**
   * the props used for change globaly ioutlined input background color.
   * default - true which show input with background color
   * false - will show input with transparent background
   */
  outlinedFilled: boolean;

  /**
   * the props used for default theme palette mode
   * explore the default theme
   * below theme options -
   * 'light' (default) - ThemeMode.LIGHT
   * 'dark' - ThemeMode.DARK
   */
  mode: ThemeMode;

  /**
   * the props used for theme primary color variants
   * we provide static below options thoe s are already defaine in src/themes/theme -
   * 'default'
   * 'theme1'
   * 'theme2'
   * 'theme3'
   * 'theme4'
   * 'theme5'
   * 'theme6'
   */
  presetColor: PresetColor;

  /**
   * The props used for display menu-items with multi-language.
   * We provide static below languages according to 'react-intl' options - https://www.npmjs.com/package/react-intl
   * 'en' (default)
   * 'fr'
   * 'ro'
   * 'zh'
   */
  i18n: I18n;

  /**
   * the props used for default theme direction
   * explore the default theme
   * below theme options -
   * 'ltr' (default) - ThemeDirection.LTR
   * 'rtl' - ThemeDirection.RTL
   */
  themeDirection: ThemeDirection;

  /**
   * the props used for theme container.
   * the container centers your content horizontally. It's the most basic layout element.
   * true - (default) which show container
   * false - will show fluid
   */
  container: boolean;
};

export type CustomizationProps = {
  menuOrientation: MenuOrientation;
  miniDrawer: boolean;
  fontFamily: FontFamily;
  borderRadius: number;
  outlinedFilled: boolean;
  mode: ThemeMode;
  presetColor: PresetColor;
  i18n: I18n;
  themeDirection: ThemeDirection;
  container: boolean;
  onChangeMenuOrientation: (menuOrientation: MenuOrientation) => void;
  onChangeMiniDrawer: (miniDrawer: boolean) => void;
  onChangeMode: (mode: ThemeMode) => void;
  onChangePresetColor: (presetColor: PresetColor) => void;
  onChangeLocale: (i18n: I18n) => void;
  onChangeDirection: (themeDirection: ThemeDirection) => void;
  onChangeContainer: (container: boolean) => void;
  onChangeFontFamily: (fontFamily: FontFamily) => void;
  onChangeBorderRadius: (event: Event, newValue: number | number[]) => void;
  onChangeOutlinedField: (outlinedFilled: boolean) => void;
  onReset: () => void;
};
export { ThemeMode };

