// Clan Reducer

import {
    GET_CLANS,
    GET_CLAN,
    ADD_CLAN,
    EDIT_CLAN,
    REMOVE_CLAN,
    SET_CLAN_LOADING,
    CLEAR_CLAN_LOADING
} from '../actions/types';

const clanReducerDefaultState = {
    clans: [],
    clan: {},
    isClanLoading: false
};

export default ( state = clanReducerDefaultState, action ) => {
    switch ( action.type ) {
        
        case GET_CLANS:
            return {
                ...state,
                clans: action.clans.reverse()
            };

        case GET_CLAN:
            return {
                ...state,
                clan: action.clan
            };

        case ADD_CLAN:
            return {
                ...state,
                clans: [ action.clan, ...state.clans ]
            };

        case EDIT_CLAN:
            return {
                ...state,
                clans: state.clans.map( ( clan ) => {
                    if ( clan.id === action.id ) {
                        return {
                            ...clan,
                            ...action.updates
                        }
                    } else {
                        return clan;
                    }
                })
            };

        case REMOVE_CLAN:
            return {
                ...state,
                clans: state.clans.filter( ( clan ) => clan.id !== action.id )
            };
        
        case SET_CLAN_LOADING:
            return {
                ...state,
                isClanLoading: true
            };

        case CLEAR_CLAN_LOADING:
            return {
                ...state,
                isClanLoading: false
            };
    
        default:
            return state;
    };
};