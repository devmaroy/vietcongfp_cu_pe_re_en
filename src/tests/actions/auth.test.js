import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import history from '../../routers/history';
import {  
    logout,
    setCurrentUser,
    setAuthLoading,
    clearAuthLoading,
    startLogout
} from '../../actions/auth';
import { 
    LOGOUT, 
    SET_CURRENT_USER,
    SET_AUTH_LOADING,
    CLEAR_AUTH_LOADING
} from '../../actions/types';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore( [ thunk ] );


// Logout
test( 'should generate logout action object', () => {
    const action = logout();
    
    expect( action ).toEqual({
        type: LOGOUT
    });
});


// Start Logout
test( 'should start logout', ( done ) => {
    const pushSpy = jest.spyOn( history, 'push' );
    const store = createMockStore({});

    store.dispatch( startLogout() ).then(() => {
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: LOGOUT
        });

        expect( pushSpy ).toHaveBeenLastCalledWith( '/login' );

        done();
    }); 
});


// Set Current User
test( 'should generate set current user action object', () => {
    const user = {
        uid: 'someid',
        name: 'Joshi',
        email: 'email@gmail.com'
    };
    
    const action = setCurrentUser( user );
    
    expect( action ).toEqual({
        type: SET_CURRENT_USER,
        user
    });
});


// Set Auth Loading
test( 'should generate set auth loading action object', () => {
    const action = setAuthLoading();
    
    expect( action ).toEqual({
        type: SET_AUTH_LOADING
    });
});


// Clear Auth Loading
test( 'should generate clear auth loading action object', () => {
    const action = clearAuthLoading();
    
    expect( action ).toEqual({
        type: CLEAR_AUTH_LOADING
    });
});