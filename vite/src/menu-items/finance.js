import { IconLayoutDashboard, IconCloudUpload, IconListDetails, IconFileInvoice, IconSettings } from '@tabler/icons-react';

const icons = { IconLayoutDashboard, IconCloudUpload, IconListDetails, IconFileInvoice, IconSettings };

const finance = {
  id: 'finance',
  title: 'FinanceLog',
  type: 'group',
  children: [
    {
      id: 'finance-overview',
      title: 'Overview',
      type: 'item',
      url: '/finance/overview',
      icon: icons.IconLayoutDashboard,
      breadcrumbs: false
    },
    {
      id: 'finance-upload',
      title: 'Upload PDFs',
      type: 'item',
      url: '/finance/upload',
      icon: icons.IconCloudUpload,
      breadcrumbs: false
    },
    {
      id: 'finance-transactions',
      title: 'Transactions',
      type: 'item',
      url: '/finance/transactions',
      icon: icons.IconListDetails,
      breadcrumbs: false
    },
    {
      id: 'finance-statements',
      title: 'Statements',
      type: 'item',
      url: '/finance/statements',
      icon: icons.IconFileInvoice,
      breadcrumbs: false
    },
    {
      id: 'finance-settings',
      title: 'Settings',
      type: 'item',
      url: '/finance/settings',
      icon: icons.IconSettings,
      breadcrumbs: false
    }
  ]
};

export default finance;
