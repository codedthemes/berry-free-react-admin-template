import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {IntlProvider} from 'react-intl';
import {jssPreset, StylesProvider, ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import StyledEngineProvider from '@material-ui/core/StyledEngineProvider';


import theme from './themes';
import Routes from './routes';
import Snackbar from './ui-component/extended/Snackbar';
import NavigationScroll from './layout/NavigationScroll';

import rtlPlugin from 'stylis-plugin-rtl';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';

import {create} from 'jss';
import rtl from 'jss-rtl';

const jss = create({
    plugins: [...jssPreset().plugins, rtl()]
});

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin]
});

const loadLocaleData = (locale) => {
    switch (locale) {
        default:
            return import('./utils/locals/en.json');
    }
};

const App = () => {
    const customization = useSelector((state) => state.customization);
    const [messages, setMessages] = useState();

    useEffect(() => {
        loadLocaleData(customization.locale).then((d) => {
            setMessages(d.default);
        });
    }, [customization]);

    if (customization.rtlLayout) {
        document.querySelector('body').setAttribute('dir', 'rtl');
    }

    return (
        <React.Fragment>
            <StylesProvider jss={jss}>
                <CacheProvider value={cacheRtl}>
                    {messages && (
                        <IntlProvider locale={customization.locale} defaultLocale="en" messages={messages}>
                            <StyledEngineProvider injectFirst>
                                <NavigationScroll>
                                    <ThemeProvider theme={theme(customization)}>
                                        <CssBaseline />
                                            <Routes />
                                            <Snackbar />
                                    </ThemeProvider>
                                </NavigationScroll>
                            </StyledEngineProvider>
                        </IntlProvider>
                    )}
                </CacheProvider>
            </StylesProvider>
        </React.Fragment>
    );
};

export default App;
