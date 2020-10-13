// Auth Reducer

import { 
    SET_CURRENT_USER, 
    SET_AUTH_LOADING, 
    CLEAR_AUTH_LOADING,
    LOGOUT 
} from '../actions/types';

const authReducerDefaultState = {
    isLoading: false,
    isAuthenticated: false,
    user: {}
};

export default ( state = authReducerDefaultState, action ) => {
    switch ( action.type ) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: !!action.user.uid,
                user: action.user
            }

        case SET_AUTH_LOADING:
            return {
                ...state,
                isLoading: true
            }

        case CLEAR_AUTH_LOADING:
            return {
                ...state,
                isLoading: false
            }

        case LOGOUT:
            return {};
        default:
            return state;
    }
};