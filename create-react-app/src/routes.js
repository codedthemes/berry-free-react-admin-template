import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './views/Landing'; // Ensure the path is correct
import StockDetailsPage from './views/StockDetailsPage'; // Ensure the path is correct

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/stock-details/:symbol" element={<StockDetailsPage />} />
      {/* Add other routes as needed */}
    </Routes>
  );
};

export default MainRoutes;

