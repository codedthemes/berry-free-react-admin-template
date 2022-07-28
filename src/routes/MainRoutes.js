import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const Main = Loadable(lazy(() => import('views/utilities/Main')));
const Info = Loadable(lazy(() => import('views/utilities/Info')));
const InjectionInfoRequest = Loadable(lazy(() => import('views/utilities/InjectionInfoRequest')));
const History = Loadable(lazy(() => import('views/utilities/History')));
const RequestChange = Loadable(lazy(() => import('views/utilities/RequestChange')));
const SelfDeclare = Loadable(lazy(() => import('views/utilities/SelfDeclare')));
const Register = Loadable(lazy(() => import('views/utilities/Register')));

const Role = Loadable(lazy(() => import('views/other/Role')));
const AddInjectionInfo = Loadable(lazy(() => import('views/other/AddInjectionInfo')));
// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'main',
                    element: <Main />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'info',
                    element: <Info />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'injection-info-request',
                    element: <InjectionInfoRequest />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'self-declare',
                    element: <SelfDeclare />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'history',
                    element: <History />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'request-change',
                    element: <RequestChange />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'register',
                    element: <Register />
                }
            ]
        },
        {
            path: 'admin',
            children: [
                {
                    path: 'role',
                    element: <Role />
                }
            ]
        },
        {
            path: 'admin',
            children: [
                {
                    path: 'add-injection-info',
                    element: <Role />
                }
            ]
        },

    ]
};

export default MainRoutes;
