// material-ui
import { chipClasses } from '@mui/material';
import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - CHIP ||============================== //

export default function Chip(theme) {
    return {
        MuiChip: {
            styleOverrides: {
                root: {
                    '&.MuiChip-deletable .MuiChip-deleteIcon': {
                        color: 'inherit'
                    },
                    [`&.${chipClasses.clickable}.${chipClasses.colorPrimary}`]: {
                        color: theme.colors?.primaryMain,
                        backgroundColor: theme.colors?.primaryLight,
                        '&:hover': {
                            color: theme.colors?.primaryLight,
                            backgroundColor: theme.colors?.primaryDark
                        }
                    },
                    [`&.${chipClasses.sizeSmall}.${chipClasses.colorError}`]: {
                        borderColor: theme.colors?.errorMain,
                        color: theme.colors?.errorMain,
                        backgroundColor: alpha(theme.colors?.errorLight, 0.25)
                    },
                    [`&.${chipClasses.sizeSmall}.${chipClasses.colorWarning}`]: {
                        borderColor: theme.colors?.warningDark,
                        color: theme.colors?.warningDark,
                        backgroundColor: theme.colors?.warningLight
                    },
                    [`&.${chipClasses.sizeSmall}.${chipClasses.colorSuccess}`]: {
                        borderColor: theme.colors?.successDark,
                        color: theme.colors?.successDark,
                        backgroundColor: alpha(theme.colors?.successLight, 0.5)
                    }
                }
            }
        }
    };
}
