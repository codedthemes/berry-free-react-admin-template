// material-ui
import { alpha } from '@mui/material/styles';

function createCustomShadow(theme, color) {
  const transparent = alpha(color, 0.24);
  return {
    z1: `0 1px 2px 0 ${transparent}`,
    z8: `0 8px 16px 0 ${transparent}`,
    z12: `0 12px 24px 0 ${transparent} 0 10px 20px 0 ${transparent}`,
    z16: `0 0 3px 0 ${transparent} 0 14px 28px -5px ${transparent}`,
    z20: `0 0 3px 0 ${transparent} 0 18px 36px -5px ${transparent}`,
    z24: `0 0 6px 0 ${transparent} 0 21px 44px 0 ${transparent}`,

    primary: `0px 12px 14px 0px ${alpha(theme.palette.primary.main, 0.3)}`,
    secondary: `0px 12px 14px 0px ${alpha(theme.palette.secondary.main, 0.3)}`,
    orange: `0px 12px 14px 0px ${alpha(theme.palette.orange.main, 0.3)}`,
    success: `0px 12px 14px 0px ${alpha(theme.palette.success.main, 0.3)}`,
    warning: `0px 12px 14px 0px ${alpha(theme.palette.warning.main, 0.3)}`,
    error: `0px 12px 14px 0px ${alpha(theme.palette.error.main, 0.3)}`
  };
}

export default function customShadows(mode, theme) {
  return createCustomShadow(theme, theme.palette.grey[900]);
}
