// Auth Actions

import { firebase } from '../firebase/firebase';
import history from '../routers/history';
import { 
    LOGOUT, 
    SET_CURRENT_USER, 
    SET_AUTH_LOADING,
    CLEAR_AUTH_LOADING,
    GET_ERRORS
} from './types';

// Set current user helper function
const setUserData = ( user, dispatch ) => {
    const userData = {
        uid: user.uid,
        name: user.displayName,
        email: user.email
    };

    dispatch( setCurrentUser( userData ) );
};


// Login
export const startLogin = ( { email, password } ) => {
    return ( dispatch ) => {
        dispatch( setAuthLoading() );

        return firebase
            .auth()
            .signInWithEmailAndPassword( email, password )
            .then( ( user ) => {  
                setUserData( user, dispatch );
                history.push( '/' );
            })
            .catch( ( err ) => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err 
                });

                dispatch( clearAuthLoading() );
            });
    };
};


// Register
export const startRegister = ( { name, email, password } ) => {
    return ( dispatch ) => {
        dispatch( setAuthLoading() );
        
            return firebase
            .auth()
            .createUserWithEmailAndPassword( email, password )
            .then( ( user ) => {
                if ( user ) {
                    user.updateProfile({
                        displayName: name
                    }).then(() => {
                        setUserData( user, dispatch );
                        history.push( '/' );
                    });
                }
            })
            .catch( ( err ) => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err
                });

                dispatch( clearAuthLoading() );
            });
    };
};


// Logout
export const startLogout = () => {
    return ( dispatch ) => {
        
        return firebase
            .auth()
            .signOut()
            .then(() => {
                dispatch( logout() );
                history.push( '/login' );
            })
            .catch( ( err ) => {
                // Simple redirect to non existent route
                history.push( '/oops' );
            });
    };
};


// Logout
export const logout = () => ({
    type: LOGOUT
});


// Set Current User
export const setCurrentUser = ( user ) => ({
    type: SET_CURRENT_USER,
    user
});


// Set Auth Loading
export const setAuthLoading = () => ({
    type: SET_AUTH_LOADING
});


// Clear Auth Loading
export const clearAuthLoading = () => ({
    type: CLEAR_AUTH_LOADING
});