// Import necessary React and Material UI components
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import axios from 'axios';

// Import your custom components
import TotalPortfolioValueCard from '../dashboard/Default/TotalPortfolioValueCard';
import ROICard from '../dashboard/Default/ROICard';
// Commented out LineGraph as per your request
// import LineGraph from '../dashboard/Default/LineGraph';
import StockTickerDisplayCard from '../dashboard/Default/StockTickerDisplayCard';
import StockListItem from './StockListItem'; // Make sure this path is correct

const LandingPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [portfolioSummary, setPortfolioSummary] = useState({ total_portfolio_value: 0, roi: 0 });
    const [stockData, setStockData] = useState([]);

    useEffect(() => {
        // Fetch the portfolio summary data including total value and ROI
        const fetchPortfolioSummary = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('/api/portfolio');
                console.log("API Response:", response); // Debugging log
                if (response.status === 200 && response.data) {
                    setPortfolioSummary({
                        total_portfolio_value: response.data.total_portfolio_value,
                        roi: response.data.roi
                    });
                    // Ensure that response.data.stocks exists and is an array
                    if (Array.isArray(response.data.stocks)) {
                        setStockData(response.data.stocks);
                    } else {
                        console.error('Stocks data is not in expected format:', response.data.stocks);
                        setStockData([]); // Set to empty array if not in expected format
                    }
                } else {
                    console.error('Failed to fetch data: ', response);
                }
            } catch (error) {
                console.error('Error fetching portfolio summary: ', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPortfolioSummary();
    }, []);

    return (
        <Grid container spacing={3}>
            {/* Total Portfolio Value Card */}
            <Grid item xs={12} sm={6}>
                <TotalPortfolioValueCard isLoading={isLoading} totalPortfolioValue={portfolioSummary.total_portfolio_value} />
            </Grid>

            {/* ROI Card */}
            <Grid item xs={12} sm={6}>
                <ROICard isLoading={isLoading} roi={portfolioSummary.roi} />
            </Grid>

            {/* Stock Ticker Display Card */}
            <Grid item xs={12}>
                <StockTickerDisplayCard stockData={stockData} />
            </Grid>

            {/* List of Stock Symbols */}
            {stockData && stockData.length > 0 && (
                <Grid item xs={12}>
                    {stockData.map((stock) => (
                        <StockListItem key={stock.symbol} symbol={stock.symbol} />
                    ))}
                </Grid>
            )}
        </Grid>
    );
};

export default LandingPage;
