import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// Components

// Components - Common
import ErrorPage from '../components/common/ErrorPage';

// Components - Auth
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

// Components - Post
import PostPage from '../components/post/PostPage';
import Post from '../components/post/Post';
import AddPostPage from '../components/post/AddPostPage';
import EditPostPage from '../components/post/EditPostPage';


const AppRouter = () => (
    <Router history={ history } >
        <div>
            <Switch>
                <PublicRoute path="/" component={ PostPage } exact={ true } />
                <PublicRoute path="/login" component={ Login } />
                <PrivateRoute path="/register" component={ Register } />
                <PrivateRoute path="/posts/create" component={ AddPostPage } />
                <PrivateRoute path="/posts/:id/edit" component={ EditPostPage } />
                <PublicRoute path="/posts/:id" component={ Post } exact={ true } />          
                <Route component={ ErrorPage } />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;