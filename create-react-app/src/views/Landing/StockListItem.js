// StockListItem.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItem, ListItemText } from '@mui/material';

const StockListItem = ({ symbol }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    // Navigate programmatically to the stock details page for the given symbol
    navigate(`/stock-details/${symbol}`);
  };

  return (
    <ListItem button onClick={handleNavigate}>
      <ListItemText primary={symbol} />
    </ListItem>
  );
};

export default StockListItem;

