import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import errorReducer from '../reducers/error';
import postReducer from '../reducers/post';
import clanReducer from '../reducers/clan';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            errors: errorReducer,
            post: postReducer,
            clan: clanReducer
        }),
        composeEnhancers( applyMiddleware( thunk ) )
    );

    return store;
};