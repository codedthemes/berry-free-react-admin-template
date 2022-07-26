// assets
import { IconChartBar } from '@tabler/icons';

// constant
const icons = { IconChartBar };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Trang chủ',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Số liệu covid',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.IconChartBar,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
