import { useEffect, ReactNode } from 'react';

// material-ui
import { CacheProvider } from '@emotion/react';
import createCache, { StylisPlugin } from '@emotion/cache';

// third party
import rtlPlugin from 'stylis-plugin-rtl';
import useConfig from '../../hooks/useConfig';

// project imports
import { ThemeDirection } from '../../config';

// ==============================|| RTL LAYOUT ||============================== //

interface RTLLayoutProps {
  children: ReactNode;
}

export default function RTLLayout({ children }: RTLLayoutProps) {
  const { themeDirection } = useConfig();

  useEffect(() => {
    document.dir = themeDirection;
  }, [themeDirection]);

  const cacheRtl = createCache({
    key: themeDirection === ThemeDirection.RTL ? 'rtl' : 'css',
    prepend: true,
    stylisPlugins: themeDirection === ThemeDirection.RTL ? [rtlPlugin as StylisPlugin] : []
  });

  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
}
