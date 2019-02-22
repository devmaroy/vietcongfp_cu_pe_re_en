import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// Components

import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';

import PostPage from '../components/post/PostPage';

export const history = createHistory();

const AppRouter = () => (
    <Router history={ history } >
        <div>
            <Switch>
                <PublicRoute path="/" component={ PostPage } exact={ true } />
                <PublicRoute path="/login" component={ LoginPage } />
                <Route component={ NotFoundPage } />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;