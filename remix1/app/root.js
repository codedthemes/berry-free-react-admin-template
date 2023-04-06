import { Links, LiveReload, Meta, Scripts, ScrollRestoration, useCatch, useLocation } from '@remix-run/react';
import { Provider, useSelector } from 'react-redux';

// project imports
import { store } from 'store';
import theme from 'themes';
import NavigationScroll from 'layout/NavigationScroll';
import MainLayout from 'layout/MainLayout';
import MinimalLayout from 'layout/MinimalLayout';
import Error from 'error';

// material-ui
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

// assets
import globalStyles from 'styles/style.css';
import scrollBarStyle from 'react-perfect-scrollbar/dist/css/styles.css';
import favicon from '../public/favicon.svg';

// export links
export const links = () => [
    {
        rel: 'icon',
        href: favicon,
        type: 'image/svg'
    },
    {
        rel: 'stylesheet',
        href: globalStyles
    },
    {
        rel: 'stylesheet',
        href: scrollBarStyle
    },
    {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com'
    },
    {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap'
    }
];

// export meta
export const meta = () => ({
    charset: 'utf-8',
    title: 'Berry - React Material Admin Dashboard Template',
    viewport: 'width=device-width,initial-scale=1',
    description:
        'Start your next React project with Berry admin template. It build with Reactjs, Material-UI, Redux, and Hook for faster web development.'
});

// ================================|| APP ||================================ //

export default function App() {
    return (
        <html lang="en">
            <head>
                <Meta />
                <meta name="theme-color" content="#2296f3" />
                <meta
                    name="keywords"
                    content="react admin template, material-ui react dashboard template, reactjs admin template, reactjs dashboard, react backend template"
                />
                <meta name="author" content="CodedThemes" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://berrydashboard.io/" />
                <meta property="og:site_name" content="berrydashboard.io" />
                <meta property="article:publisher" content="https://www.facebook.com/codedthemes" />
                <meta property="og:title" content="Berry - React Material Dashboard Template" />
                <meta
                    property="og:description"
                    content="Berry Dashboard is made for the faster web application development built using Material-UI, Reactjs, Redux & Hook API."
                />
                <meta property="og:image" content="https://berrydashboard.io/og-image/og-facebook.png" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://berrydashboard.io" />
                <meta property="twitter:title" content="Berry - React Material Dashboard Template" />
                <meta
                    property="twitter:description"
                    content="Berry Dashboard is made for the faster web application development built using Material-UI, Reactjs, Redux & Hook API."
                />
                <meta property="twitter:image" content="https://berrydashboard.io/og-image/og-twitter.png" />
                <meta name="twitter:creator" content="@codedthemes" />
                <Links /> {typeof document === 'undefined' ? '__STYLES__' : null}
            </head>
            <body>
                <Provider store={store}>
                    <Free />
                    <ScrollRestoration />
                    <Scripts />
                    <LiveReload />
                </Provider>
            </body>
        </html>
    );
}

export function CatchBoundary() {
    const caught = useCatch();

    return (
        <html>
            <head>
                <title>Oops!</title>
                <Meta />
                <Links />
                {typeof document === 'undefined' ? '__STYLES__' : null}
            </head>
            <body>
                <Provider store={store}>
                    <Error />
                    <Scripts />
                </Provider>
            </body>
        </html>
    );
}

export const Free = () => {
    const location = useLocation();
    const customization = useSelector((state) => state.customization);
    return (
        <StyledEngineProvider injectfirst>
            <ThemeProvider theme={theme(customization)}>
                <CssBaseline />
                <NavigationScroll>{location.pathname.startsWith('/pages') ? <MinimalLayout /> : <MainLayout />}</NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};
