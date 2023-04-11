import { useSelector } from 'react-redux';

// material-ui
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import theme from 'themes';
import ErrorPage from './errorPage';

const Error = () => {
    const customization = useSelector((state) => state.customization);
    return (
        <StyledEngineProvider injectfirst>
            <ThemeProvider theme={theme(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <ErrorPage />
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default Error;
