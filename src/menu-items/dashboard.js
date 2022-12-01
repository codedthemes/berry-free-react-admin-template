// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    type: 'group',
    children: [
        {
            id: 'statisticalMapData',
            title: '통계 지도 데이터',
            type: 'item',
            url: '/',
            breadcrumbs: false
        },
        {
            id: 'siteStatistics',
            title: '사이트 통계',
            type: 'item',
            url: '/siteStatistics',
            breadcrumbs: false
        },
        {
            id: 'regionStatistics',
            title: '지역별 통계',
            type: 'item',
            url: '/regionStatistics',
            breadcrumbs: false
        },
        {
            id: 'comparisonAnalysis',
            title: '지역별 분야별 비교 분석',
            type: 'item',
            url: '/comparisonAnalysis',
            breadcrumbs: false
        },
        {
            id: 'analysisMap',
            title: '이동 경로 분석 지도',
            type: 'item',
            url: '/analysisMap',
            breadcrumbs: false
        },
        {
            id: 'routeAnalysisTable',
            title: '이동 경로 분석표',
            type: 'item',
            url: '/routeAnalysisTable',
            breadcrumbs: false
        },
        {
            id: 'routeMap',
            title: '다빈도 이동경로',
            type: 'item',
            url: '/routeMap',
            breadcrumbs: false
        },
        {
            id: 'sensorStatus',
            title: '센서 상태',
            type: 'item',
            url: '/sensorStatus',
            breadcrumbs: false
        },
        {
            id: 'regionSettings',
            title: '지역 설정',
            type: 'item',
            url: '/regionSettings',
            breadcrumbs: false
        }
    ]
};

export default dashboard;
