'use client';
import PropTypes from 'prop-types';

// material-ui
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import ThemeCustomization from 'themes';

import { DEFAULT_THEME_MODE } from 'config';
import { ConfigProvider } from 'contexts/ConfigContext';

export default function ProviderWrapper({ children }) {
  return (
    <>
      <InitColorSchemeScript modeStorageKey="theme-mode" attribute="data-color-scheme" defaultMode={DEFAULT_THEME_MODE} />
      <ConfigProvider>
        <ThemeCustomization>
          <NavigationScroll>{children}</NavigationScroll>
        </ThemeCustomization>
      </ConfigProvider>
    </>
  );
}

ProviderWrapper.propTypes = { children: PropTypes.node };
