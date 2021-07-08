// assets
import { IconBrandChrome, IconHelp, IconSitemap } from '@tabler/icons';

// constant
const icons = {
    IconBrandChrome: IconBrandChrome,
    IconHelp: IconHelp,
    IconSitemap: IconSitemap
};

//-----------------------|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||-----------------------//

export const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'sample-page',
            title: 'Sample Page',
            type: 'item',
            url: '/sample-page',
            icon: icons['IconBrandChrome'],
            breadcrumbs: false
        },
        {
            id: 'documentation',
            title: 'Documentation',
            type: 'item',
            url: 'https://docs.appseed.us/products/react/node-js-berry-dashboard',
            icon: icons['IconHelp'],
            external: true,
            target: true
        }
    ]
};
