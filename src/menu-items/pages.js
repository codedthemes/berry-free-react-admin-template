// assets
import { IconKey, IconReceipt2, IconBug, IconBellRinging, IconPhoneCall } from '@tabler/icons';

// constant
const icons = {
    IconKey: IconKey,
    IconReceipt2: IconReceipt2,
    IconBug: IconBug,
    IconBellRinging: IconBellRinging,
    IconPhoneCall: IconPhoneCall
};

//-----------------------|| EXTRA PAGES MENU ITEMS ||-----------------------//

export const pages = {
    id: 'pages',
    title: 'Pages',
    caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'authentication',
            title: 'Authentication',
            type: 'collapse',
            icon: icons['IconKey'],
            children: [
                // {
                //     id: 'login3',
                //     title: 'Login',
                //     type: 'item',
                //     url: '/pages/login/login3',
                //     target: true
                // },
                // {
                //     id: 'register3',
                //     title: 'Register',
                //     type: 'item',
                //     url: '/pages/register/register3',
                //     target: true
                // }
            ]
        }
    ]
};
