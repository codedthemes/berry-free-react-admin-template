import React from 'react';

// material-ui
import Skeleton from '@material-ui/core/Skeleton';

// ===========================|| SKELETON IMAGE CARD ||=========================== //

const ImagePlaceholder = ({ ...others }) => <Skeleton variant="rect" {...others} animation="wave" />;

export default ImagePlaceholder;
