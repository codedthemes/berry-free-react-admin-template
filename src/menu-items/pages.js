// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    type: 'group',
    children: [
        {
            id: 'Report',
            title: '보고서 생산',
            type: 'collapse',
            icon: icons.IconKey,

            children: [
                {
                    id: 'dailyReport',
                    title: '일일보고서',
                    type: 'item',
                    url: '/Report/dailyReport',
                    target: true
                },
                {
                    id: 'summaryReport',
                    title: '요약리포트',
                    type: 'item',
                    url: '/Report/summaryReport',
                    target: true
                },
                {
                    id: 'csvDownload',
                    title: 'CSV 다운로드',
                    type: 'item',
                    url: '/Report/csvDownload',
                    target: true
                }
            ]
        }
    ]
};

export default pages;
