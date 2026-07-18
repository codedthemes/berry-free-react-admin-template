import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';

export default function CardSecondaryAction({ title, link, icon }) {
  const theme = useTheme();

  return (
    <Tooltip title={title || 'Reference'} placement="left">
      <IconButton
        variant="outlined"
        color="primary"
        size="small"
        disableRipple
        component={Link}
        href={link}
        aria-label="redirect pages"
        target="_blank"
        sx={{ borderRadius: 6, borderWidth: 2, padding: 0.25 }}
      >
        {icon || (
          <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0)">
              <path d="M100 260.9V131L212.5 195.95V239.25L137.5 195.95V282.55L100 260.9Z" fill={theme.vars.palette.primary['darker']} />
              <path
                d="M212.5 195.95L325 131V260.9L250 304.2L212.5 282.55L287.5 239.25V195.95L212.5 239.25V195.95Z"
                fill={theme.vars.palette.primary.main}
              />
              <path d="M212.5 282.55V325.85L287.5 369.15V325.85L212.5 282.55Z" fill={theme.vars.palette.primary['darker']} />
              <path
                d="M287.5 369.15L400 304.2V217.6L362.5 239.25V282.55L287.5 325.85V369.15ZM362.5 195.95V152.65L400 131V174.3L362.5 195.95Z"
                fill={theme.vars.palette.primary.main}
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="300" height="238.3" fill="white" transform="translate(100 131)" />
              </clipPath>
            </defs>
          </svg>
        )}
      </IconButton>
    </Tooltip>
  );
}

CardSecondaryAction.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};
