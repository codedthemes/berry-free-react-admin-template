// assets
import { IconBrandChrome, IconBriefcase, IconHelp, IconTool, IconUserSquareRounded } from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp, IconUserSquareRounded, IconBriefcase, IconTool };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    {
      id: 'profile-page',
      title: 'Profile',
      type: 'item',
      url: '/profile-page',
      icon: icons.IconUserSquareRounded,
      breadcrumbs: false
    },
    {
      id: 'job-page',
      title: 'Job',
      type: 'item',
      url: '/job-page',
      icon: icons.IconBriefcase,
      breadcrumbs: false
    },
    {
      id: 'skill-page',
      title: 'Skill',
      type: 'item',
      url: '/skill-page',
      icon: icons.IconTool,
      breadcrumbs: false
    },
  ]
};

export default other;
