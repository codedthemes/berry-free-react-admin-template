import React from 'react';
import MainCard from './path-to-MainCard/MainCard'; // Update this path

const ROICard = ({ value }) => (
  <MainCard title="ROI" contentSX={{ p: 2 }}>
    <Typography variant="h4" align="center">
      {value.toFixed(2)}%
    </Typography>
  </MainCard>
);

export default ROICard;