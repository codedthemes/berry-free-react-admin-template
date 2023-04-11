/**
 * Password validator for login pages
 */
// import value from 'assets/scss/_themes-vars.module.scss';
// sass Issue
const value = {
    paper: '#ffffff',
    primaryLight: '#eef2f6',
    primary200: '#90caf9',
    primaryMain: '#2196f3',
    primaryDark: '#1e88e5',
    primary800: '#1565c0',
    secondaryLight: '#ede7f6',
    secondary200: '#b39ddb',
    secondaryMain: '#673ab7',
    secondaryDark: '#5e35b1',
    secondary800: '#4527a0',
    successLight: '#b9f6ca',
    success200: '#69f0ae',
    successMain: '#00e676',
    successDark: '#00c853',
    errorLight: '#ef9a9a',
    errorMain: '#f44336',
    errorDark: '#c62828',
    orangeLight: '#fbe9e7',
    orangeMain: '#ffab91',
    orangeDark: '#d84315',
    warningLight: '#fff8e1',
    warningMain: '#ffe57f',
    warningDark: '#ffc107',
    grey50: '#F8FAFC',
    grey100: '#EEF2F6',
    grey200: '#E3E8EF',
    grey300: '#CDD5DF',
    grey500: '#697586',
    grey600: '#4B5565',
    grey700: '#364152',
    grey900: '#121926',
    darkPaper: '#111936',
    darkBackground: '#1a223f',
    darkLevel1: '#29314f',
    darkLevel2: '#212946',
    darkTextTitle: '#d7dcec',
    darkTextPrimary: '#bdc8f0',
    darkTextSecondary: '#8492c4',
    darkPrimaryLight: '#eef2f6',
    darkPrimaryMain: '#2196f3',
    darkPrimaryDark: '#1e88e5',
    darkPrimary200: '#90caf9',
    darkPrimary800: '#1565c0',
    darkSecondaryLight: '#d1c4e9',
    darkSecondaryMain: '#7c4dff',
    darkSecondaryDark: '#651fff',
    darkSecondary200: '#b39ddb',
    darkSecondary800: '#6200ea'
};

// has number
const hasNumber = (number) => new RegExp(/[0-9]/).test(number);

// has mix of small and capitals
const hasMixed = (number) => new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

// has special chars
const hasSpecial = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

// set color based on password strength
export const strengthColor = (count) => {
    if (count < 2) return { label: 'Poor', color: value.errorMain };
    if (count < 3) return { label: 'Weak', color: value.warningDark };
    if (count < 4) return { label: 'Normal', color: value.orangeMain };
    if (count < 5) return { label: 'Good', color: value.successMain };
    if (count < 6) return { label: 'Strong', color: value.successDark };
    return { label: 'Poor', color: value.errorMain };
};

// password strength indicator
export const strengthIndicator = (number) => {
    let strengths = 0;
    if (number.length > 5) strengths += 1;
    if (number.length > 7) strengths += 1;
    if (hasNumber(number)) strengths += 1;
    if (hasSpecial(number)) strengths += 1;
    if (hasMixed(number)) strengths += 1;
    return strengths;
};
