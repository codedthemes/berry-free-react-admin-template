// project imports
import { withAlpha } from 'utils/colorUtils';

// assets
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// ==============================|| OVERRIDES - ALERT ||============================== //

export default function Alert(theme) {
  const { vars } = theme;

  const getPaletteColor = (severity) => (severity ? vars.palette[severity] : vars.palette.info);

  const getCommonStyles = (ownerState) => {
    const isWarningOrSuccess = ownerState.severity === 'warning' || ownerState.severity === 'success';
    return { isWarningOrSuccess };
  };

  const standardVariant = ({ ownerState }) => {
    const paletteColor = getPaletteColor(ownerState.severity);
    const { isWarningOrSuccess } = getCommonStyles(ownerState);

    return {
      color: isWarningOrSuccess ? paletteColor.dark : paletteColor.main,
      backgroundColor: withAlpha(paletteColor.main, 0.075),
      '& .MuiAlert-icon': { color: isWarningOrSuccess ? paletteColor.dark : paletteColor.main }
    };
  };

  const outlinedVariant = ({ ownerState }) => {
    const paletteColor = getPaletteColor(ownerState.severity);
    const { isWarningOrSuccess } = getCommonStyles(ownerState);

    return {
      color: isWarningOrSuccess ? paletteColor.dark : paletteColor.main,
      borderColor: paletteColor.dark,
      '& .MuiAlert-icon': { color: isWarningOrSuccess ? paletteColor.dark : paletteColor.main }
    };
  };

  const filledVariant = ({ ownerState }) => {
    const paletteColor = getPaletteColor(ownerState.severity);
    const { isWarningOrSuccess } = getCommonStyles(ownerState);

    return {
      color: isWarningOrSuccess ? vars.palette.common.black : vars.palette.common.white,
      backgroundColor: isWarningOrSuccess ? paletteColor.dark : paletteColor.main,
      '& .MuiAlert-icon': {
        color: isWarningOrSuccess ? vars.palette.common.black : vars.palette.common.white
      }
    };
  };

  return {
    MuiAlert: {
      defaultProps: {
        iconMapping: {
          primary: <InfoOutlinedIcon sx={{ fontSize: 'inherit' }} />
        }
      },
      styleOverrides: {
        root: {
          alignItems: 'center',
          variants: [
            { props: { variant: 'standard' }, style: standardVariant },
            { props: { variant: 'outlined' }, style: outlinedVariant },
            { props: { variant: 'filled' }, style: filledVariant }
          ]
        },
        outlined: { border: '1px dashed' }
      }
    }
  };
}
