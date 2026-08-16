// assets
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

// ==============================|| OVERRIDES - AUTOCOMPLETE ||============================== //

export default function Autocomplete(theme, borderRadius) {
  const iconColor = theme.vars.palette.text.secondary;

  const indicatorSx = { width: 28, height: 28, color: iconColor };

  return {
    MuiAutocomplete: {
      defaultProps: {
        popupIcon: <ExpandMoreOutlinedIcon />
      },
      styleOverrides: {
        root: {
          '& .MuiAutocomplete-tag': {
            borderRadius: 8,
            margin: 0
          },
          '& .MuiOutlinedInput-root': {
            '&.MuiInputBase-sizeSmall': {
              paddingLeft: 14,
              '& .MuiAutocomplete-input': { padding: '6px 0px' }
            }
          }
        },
        popper: { borderRadius: `${borderRadius}px`, boxShadow: theme.vars.shadows[3] },
        inputRoot: { gap: 4 },
        popupIndicator: {
          ...indicatorSx,
          '& .MuiSvgIcon-root': { width: 22, height: 22 }
        },
        clearIndicator: {
          ...indicatorSx,
          '& .MuiSvgIcon-root': { width: 18, height: 18 }
        }
      }
    }
  };
}
