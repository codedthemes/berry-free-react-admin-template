// assets
import { IconDashboard } from '@tabler/icons';
import { IconPencil } from '@tabler/icons';
import { IconClipboardList } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconPencil, IconClipboardList };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'cadastro3',
            title: 'Cadastrar Envio',
            type: 'item',
            url: '/cadastro',
            icon: icons.IconPencil,
            target: true
        },
        {
            id: 'envios3',
            title: 'Meus Envios',
            type: 'item',
            url: '/envios',
            icon: icons.IconClipboardList,
            target: true
        }
    ]
};

export default dashboard;
