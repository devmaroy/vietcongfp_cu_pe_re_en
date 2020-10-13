import authReducer from '../../reducers/auth';

import {
    LOGOUT,
    SET_CURRENT_USER,
    SET_AUTH_LOADING,
    CLEAR_AUTH_LOADING
} from '../../actions/types';

// Default values
test( 'should setup default auth values', () => {
    const action = {
        type: '@@INIT'
    };

    const state = authReducer( undefined, action );

    expect( state ).toEqual({
        user: {},
        isLoading: false,
        isAuthenticated: false
    });
});


// Logout
test( 'should clear state for logout', () => {
    const currentState = {
        user: { 
            uid: '123',
            name: 'Josh',
            email: 'josh@gmail.com'
        },
        isAuthenticated: true
    };

    const action = {
        type: LOGOUT
    };

    const state = authReducer( currentState, action );

    expect( state ).toEqual({});
});


// Set Current User
test( 'should set current user', () => {
    const action = {
        type: SET_CURRENT_USER,
        user: {
            uid: '123',
            name: 'Joshio0',
            email: 'joshio@gmail.com'
        }
    };

    const state = authReducer( undefined, action );
    
    expect( state ).toEqual({
        user: action.user,
        isAuthenticated: true,
        isLoading: false
    });
});


// Set Auth Loading
test( 'should set auth loading', () => {
    const action = {
        type: SET_AUTH_LOADING
    };

    const state = authReducer( undefined, action );

    expect( state.isLoading ).toBe( true );
})


// Clear Auth Loading
test( 'should clear auth loading', () => {
    const currentState = {
        user: {},
        isAuthenticated: false,
        isLoading: true
    };

    const action = {
        type: CLEAR_AUTH_LOADING
    };

    const state = authReducer( currentState, action );

    expect( state.isLoading ).toBe( false );
});