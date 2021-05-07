import React, {lazy} from 'react';
import {Route, Switch, useLocation} from 'react-router-dom';

import MainLayout from './../layout/MainLayout';


const DashboardDefault = lazy(() => import('../views/dashboard/Default'));

const TableBasic = lazy(() => import('../views/forms/tables/TableBasic'));
const TableDense = lazy(() => import('../views/forms/tables/TableDense'));

const UtilsTypography = lazy(() => import('../views/utilities/typography'));
const UtilsColor = lazy(() => import('../views/utilities/color'));
const UtilsShadow = lazy(() => import('../views/utilities/shadow'));
const UtilsMaterialIcons = lazy(() => import('../views/utilities/icons/MaterialIcons'));
const UtilsTablerIcons = lazy(() => import('../views/utilities/icons/TablerIcons'));

const MainRoutes = () => {
    const location = useLocation();

    return (
        <Route
            path={[
                '/dashboard/default',

                '/tables/tbl-basic',
                '/tables/tbl-dense',

                '/utils/util-typography',
                '/utils/util-color',
                '/utils/util-shadow',
                '/icons/tabler-icons',
                '/icons/material-icons',
            ]}
        >
            <MainLayout showBreadcrumb={true}>
                <Switch location={location} key={location.pathname}>
                        <Route path="/dashboard/default" component={DashboardDefault} />

                        <Route path="/tables/tbl-basic" component={TableBasic} />
                        <Route path="/tables/tbl-dense" component={TableDense} />

                        <Route path="/utils/util-typography" component={UtilsTypography} />
                        <Route path="/utils/util-color" component={UtilsColor} />
                        <Route path="/utils/util-shadow" component={UtilsShadow} />
                        <Route path="/icons/tabler-icons" component={UtilsTablerIcons} />
                        <Route path="/icons/material-icons" component={UtilsMaterialIcons} />

                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;
