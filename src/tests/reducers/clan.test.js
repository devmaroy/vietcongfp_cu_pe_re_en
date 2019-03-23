import clanReducer from '../../reducers/clan';
import clans from '../fixtures/clans';

import {
    GET_CLANS,
    GET_CLAN,
    ADD_CLAN,
    EDIT_CLAN,
    REMOVE_CLAN,
    SET_CLAN_LOADING,
    CLEAR_CLAN_LOADING
} from '../../actions/types';

// Default values
test( 'should setup default clan values', () => {
    const action = {
        type: '@@INIT'
    };

    const state = clanReducer( undefined, action );

    expect( state ).toEqual({
        clans: [],
        clan: {},
        isClanLoading: false
    });
});


// Get Clans
test( 'should get clans', () => {
    const action = {
        type: GET_CLANS,
        clans
    };

    const state = clanReducer( undefined, action );

    expect( state.clans ).toEqual( clans );
});


// Get Clan
test( 'should get clan', () => {
    const action = {
        type: GET_CLAN,
        clan: clans[0]
    };

    const state = clanReducer( undefined, action );

    expect( state.clan ).toEqual( clans[0] );
});


// Add Clan
test( 'should add clan', () => {
    const currentState = {
        clans,
        clan: {},
        isClanLoading: false
    }

    const clan = {
        tag: 'BO',
        name: 'BesT oRKS',
        country: 'NL',
        leader: 'Jennifeez',
        url: 'https://bo-clan-vietcong.com/',
        eslName: 'BO-CLAN-VC',
        eslUrl: 'https://esl.com/team/550',
        createdAt: 2000
    };

    const action = {
        type: ADD_CLAN,
        clan
    };

    const state = clanReducer( currentState, action );

    expect( state.clans ).toEqual( [ clan, ...clans ] );
});


// Edit Clan
test( 'should edit clan', () => {
    const currentState = {
        clans,
        clan: {},
        isClanLoading: false
    }

    const country = 'BR';

    const action = {
        type: EDIT_CLAN,
        id: clans[1].id,
        updates: { country }
    };

    const state = clanReducer( currentState, action );

    expect( state.clans[1].country ).toBe( country );
});


// Edit Clan
test( 'should not edit clan', () => {
    const currentState = {
        clans,
        clan: {},
        isClanLoading: false
    }

    const country = 'RU';

    const action = {
        type: EDIT_CLAN,
        id: '-1',
        updates: { country }
    };

    const state = clanReducer( currentState, action );

    expect( state.clans ).toEqual( clans );
});


// Remove Clan
test( 'should remove clan', () => {
    const currentState = {
        clans,
        clan: {},
        isClanLoading: false
    }

    const action = {
        type: REMOVE_CLAN,
        id: clans[1].id
    };

    const state = clanReducer( currentState, action );

    expect( state.clans ).toEqual( [ clans[0], clans[2], clans[3], clans[4] ] );
});


// Remove Clan
test( 'should not remove clan', () => {
    const currentState = {
        clans,
        clan: {},
        isClanLoading: false
    }

    const action = {
        type: REMOVE_CLAN,
        id: '-25'
    };

    const state = clanReducer( currentState, action );

    expect( state.clans ).toEqual( clans );
});


// Set Clan Loading
test( 'should set clan loading', () => {
    const action = {
        type: SET_CLAN_LOADING
    };

    const state = clanReducer( undefined, action );

    expect( state.isClanLoading ).toEqual( true );
});


// Clear Clan Loading
test( 'should clear clan loading', () => {
    const currentState = {
        clans: [],
        clan: {},
        isClanLoading: false
    };

    const action = {
        type: CLEAR_CLAN_LOADING
    };

    const state = clanReducer( undefined, action );

    expect( state.isClanLoading ).toEqual( false );
});