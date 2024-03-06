// StockListItem.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const StockListItem = ({ symbol }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/stock-details/${symbol}`);
    };

    return <div onClick={handleNavigate}>{symbol}</div>;
};
export default StockListItem;
