import React from 'react';
import MainCard from './path-to-MainCard/MainCard'; // Update this path

const TotalValueCard = ({ value }) => (
  <MainCard title="Total Portfolio Value" contentSX={{ p: 2 }}>
    <Typography variant="h4" align="center">
      ${value.toLocaleString()}
    </Typography>
  </MainCard>
);

export default TotalValueCard;