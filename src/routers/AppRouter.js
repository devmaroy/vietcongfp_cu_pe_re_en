import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// Components

// Components - Common
import ErrorPage from '../components/common/ErrorPage';
import AboutPage from '../components/common/AboutPage';

// Components - Auth
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

// Components - Post
import PostPage from '../components/post/PostPage';
import Post from '../components/post/Post';
import AddPostPage from '../components/post/AddPostPage';
import EditPostPage from '../components/post/EditPostPage';

// Components - Clan
import ClanPage from '../components/clan/ClanPage';
import AddClanPage from '../components/clan/AddClanPage';
import EditClanPage from '../components/clan/EditClanPage';


const AppRouter = () => (
    <Router history={ history } >
        <div>
            <Switch>
                <PublicRoute path="/" component={ PostPage } exact={ true } />
                <PublicRoute path="/login" component={ Login } />
                <PublicRoute path="/register" component={ Register } />
                <PublicRoute path="/about" component={ AboutPage } />
                <PublicRoute path="/clans" component={ ClanPage } exact={ true } />
                <PrivateRoute path="/clans/create" component={ AddClanPage } />
                <PrivateRoute path="/clans/:id/edit" component={ EditClanPage } />
                <PrivateRoute path="/posts/create" component={ AddPostPage } />
                <PrivateRoute path="/posts/:id/edit" component={ EditPostPage } />
                <PublicRoute path="/posts/:id" component={ Post } exact={ true } />          
                <Route component={ ErrorPage } />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;