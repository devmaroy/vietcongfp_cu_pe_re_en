import errorReducer from '../../reducers/error';

import {
    GET_ERRORS, 
    CLEAR_ERRORS
} from '../../actions/types';

// Default values
test( 'should setup default error values', () => {
    const action = {
        type: '@@INIT'
    };

    const state = errorReducer( undefined, action );

    expect( state ).toEqual( {} );
});


// Get Errors
test( 'should get errors', () => {
    const action = {
        type: GET_ERRORS,
        payload: {
            code: 'auth-error',
            message: 'Service is not available'
        }
    };

    const state = errorReducer( undefined, action );

    expect( state ).toEqual( action.payload );
});


// Clear Errors
test( 'should clear errors', () => {
    const currentState = {
        'code': 'auth-error',
        'message': 'Email is incorrect'
    };

    const action = {
        type: CLEAR_ERRORS
    };

    const state = errorReducer( currentState, action );

    expect( state ).toEqual( {} );
});