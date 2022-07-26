// assets
import { IconVaccine, IconEdit, IconUser, IconHistory, IconWriting } from '@tabler/icons';

// constant
const icons = {
    IconVaccine,
    IconEdit,
    IconUser,
    IconHistory,
    IconWriting
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Chức năng',
    type: 'group',
    children: [
        {
            id: 'injection-data',
            title: 'Dữ liệu tiêm chủng',
            type: 'item',
            url: '/utils/main',
            icon: icons.IconVaccine,
            breadcrumbs: false
        },
        {
            id: 'info',
            title: 'Thông tin cá nhân',
            type: 'item',
            url: '/utils/info',
            icon: icons.IconUser,
            breadcrumbs: false
        },
        {
            id: 'edit-info',
            title: 'Sửa thông tin tiêm chủng',
            type: 'item',
            url: '/utils/util-shadow',
            icon: icons.IconEdit,
            breadcrumbs: false
        },
        {
            id: 'history',
            title: 'Lịch sử lây nhiễm',
            type: 'item',
            url: '/utils/history',
            icon: icons.IconHistory,
            breadcrumbs: false
        },
        {
            id: 'self-declare',
            title: 'Khai báo tình trạng nhiễm bệnh',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconWriting,
            breadcrumbs: false
        }
    ]
};

export default utilities;
