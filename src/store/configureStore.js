import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import errorReducer from '../reducers/error';
import postReducer from '../reducers/post';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            errors: errorReducer,
            post: postReducer
        }),
        composeEnhancers( applyMiddleware( thunk ) )
    );

    return store;
};