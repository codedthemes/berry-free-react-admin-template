import React, {lazy} from 'react';
import {Route, Switch, useLocation} from 'react-router-dom';
import MinimalLayout from './../layout/MinimalLayout';

// AuthenticationRoutes
const AuthLogin1 = lazy(() => import('../views/pages/authentication/authentication1/Login1'));
const AuthRegister1 = lazy(() => import('../views/pages/authentication/authentication1/Register1'));

const AuthenticationRoutes = () => {
    const location = useLocation();

    return (
        <Route
            path={[
                '/pages/login/login1',
                '/pages/register/register1',
            ]}
        >
            <MinimalLayout>
                <Switch location={location} key={location.pathname}>
                    <Route path="/pages/login/login1" component={AuthLogin1} />
                    <Route path="/pages/register/register1" component={AuthRegister1} />
                </Switch>
            </MinimalLayout>
        </Route>
    );
};

export default AuthenticationRoutes;
