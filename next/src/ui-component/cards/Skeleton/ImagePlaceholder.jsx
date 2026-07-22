// material-ui
import Skeleton from '@mui/material/Skeleton';

// ==============================|| SKELETON IMAGE CARD ||============================== //

export default function ImagePlaceholder({ ...others }) {
  return <Skeleton variant="rectangular" {...others} animation="wave" />;
}
