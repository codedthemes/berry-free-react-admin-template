// App.js
import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// Routing
import MainRoutes from './routes'; // Ensure this is the correct path to your routes.js

// Default theme
import themes from './themes'; // Ensure this is the correct path to your themes

// Project imports
import NavigationScroll from './layout/NavigationScroll'; // Ensure this is the correct path

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          {/* MainRoutes now doesn't have BrowserRouter wrapped around it */}
          <MainRoutes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
