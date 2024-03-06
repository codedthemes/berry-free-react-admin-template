import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemText } from '@mui/material';

const StockListItem = ({ symbol }) => {
  return (
    <ListItem button component={Link} to={`/stock-details/${symbol}`}>
      <ListItemText primary={symbol} />
    </ListItem>
  );
};

export default StockListItem;

