import PropTypes from 'prop-types';
// material-ui
import { styled } from '@mui/material/styles';
import MuiInputLabel from '@mui/material/InputLabel';

const BInputLabel = styled((props) => <MuiInputLabel {...props} />, {
  shouldForwardProp: (prop) => prop !== 'horizontal'
})(({ theme, horizontal }) => ({
  color: theme.vars.palette.text.primary,
  fontWeight: 500,
  marginBottom: horizontal ? 0 : 8
}));

export default function InputLabel({ children, horizontal = false, ...others }) {
  return (
    <BInputLabel horizontal={horizontal} {...others}>
      {children}
    </BInputLabel>
  );
}

InputLabel.propTypes = { children: PropTypes.any, horizontal: PropTypes.bool, others: PropTypes.any };
