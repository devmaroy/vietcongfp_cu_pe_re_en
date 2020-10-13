import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import history from './routers/history';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { logout, setCurrentUser } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { firebase } from './firebase/firebase';
import Spinner from './components/common/Spinner';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;

const renderApp = () => {
    if ( ! hasRendered ) {
        ReactDOM.render( jsx, document.getElementById( 'app' ) );
        hasRendered = true;
    }
};

ReactDOM.render(
    <Spinner 
        classNameWrapper="loader"
        style={ { width: '160px', margin: '0' } }
    />,
    document.getElementById( 'app' )
);

firebase.auth().onAuthStateChanged( ( user ) => {
    if ( user ) {
        const userData = {
            uid: user.uid,
            name: user.displayName,
            email: user.email
        };

        store.dispatch( setCurrentUser( userData ) );

        renderApp();

        if ( history.location.pathname === '/login' ) {
            history.push( '/' );
        }
    } else {
        store.dispatch( logout() );

        renderApp();
        
        if ( ! history.location.pathname === '/login' ) {
            history.push( '/' );
        } 
    }
});