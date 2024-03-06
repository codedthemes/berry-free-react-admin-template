import { Link } from 'react-router-dom';
import React from 'react';
import { ListItem, ListItemText } from '@mui/material';

// This component renders a list item that, when clicked, navigates to the stock details page for the given symbol
const StockListItem = ({ symbol }) => {
  return (
    // The ListItem component is used here with the 'button' prop to make it clickable
    // The 'component' prop is used to render the ListItem as a 'Link', enabling internal navigation to '/stock-details/:symbol'
    <ListItem button component={Link} to={`/stock-details/${symbol}`}>
      <ListItemText primary={symbol} />
    </ListItem>
  );
};

export default StockListItem;
