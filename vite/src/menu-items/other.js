// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    {
      id: 'rofile-page',
      title: 'Profile',
      type: 'item',
      url: '/profile-page',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
    {
      id: 'job-page',
      title: 'Job',
      type: 'item',
      url: '/job-page',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
    {
      id: 'skill-page',
      title: 'Skill',
      type: 'item',
      url: '/skill-page',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
  ]
};

export default other;
