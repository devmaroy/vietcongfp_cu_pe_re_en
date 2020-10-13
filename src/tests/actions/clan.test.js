import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import history from '../../routers/history';
import {  
    startGetClans,
    startGetClanById,
    startAddClan,
    startEditClan,
    startRemoveClan,
    setClanLoading,
    clearClanLoading
} from '../../actions/clan';
import { 
    GET_CLANS,
    GET_CLAN,
    ADD_CLAN,
    EDIT_CLAN,
    REMOVE_CLAN,
    SET_CLAN_LOADING,
    CLEAR_CLAN_LOADING
} from '../../actions/types';
import database from '../../firebase/firebase';
import clans from '../fixtures/clans';

const createMockStore = configureMockStore( [ thunk ] );

beforeEach( ( done ) => {
    const clansData = {};

    clans.forEach( ( { id, tag, name, country, leader, url, eslName, eslUrl, createdAt } ) => {
        clansData[ id ] = { tag, name, country, leader, url, eslName, eslUrl, createdAt };
    });

    database.ref( 'clans' ).set( clansData ).then(() => {
        done();
    });
});


// Start Get Clans
test( 'should fetch clans from db', ( done ) => {
    const store = createMockStore({});

    store.dispatch( startGetClans() ).then(() => {
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: SET_CLAN_LOADING
        });

        expect( actions[1] ).toEqual({
            type: GET_CLANS,
            clans
        });

        expect( actions[2] ).toEqual({
            type: CLEAR_CLAN_LOADING
        });

        done();
    });
});


// Start Get Clan By Id
test( 'should fetch clan by id from db', ( done ) => {
    const store = createMockStore({});
    const id = clans[2].id;

    store.dispatch( startGetClanById( id ) ).then(() => {
        const actions = store.getActions();
    

        expect( actions[0] ).toEqual({
            type: SET_CLAN_LOADING
        });

        expect( actions[1] ).toEqual({
            type: GET_CLAN,
            clan: clans[2] 
        });

        expect( actions[2] ).toEqual({
            type: CLEAR_CLAN_LOADING
        });

        done();
    });
});


// Start Add Clan
test( 'should add clan to db', ( done ) => {
    const pushSpy = jest.spyOn( history, 'push' );
    const store = createMockStore({});
    const clanData = {
        tag: 'BWIW',
        name: 'Best Killers in World',
        country: 'HU',
        leader: 'Krentonie',
        url: 'https://bwiw-clan-vc.hu/',
        eslName: 'BWIW-HU',
        eslUrl: 'https://esl.com/team/670',
        createdAt: 1000
    };

    store.dispatch( startAddClan( clanData ) ).then(() => {
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: ADD_CLAN,
            clan: {
                id: expect.any( String ),
                ...clanData
            }
        });

        expect( pushSpy ).toHaveBeenLastCalledWith( '/clans' );

        return database.ref( `clans/${ actions[0].clan.id }` ).once( 'value' );
    }).then( ( snapshot ) => {
        expect( snapshot.val() ).toEqual( clanData );
        done();
    });
});


// Start Edit Clan
test( 'should edit clan from db', ( done ) => {
    const pushSpy = jest.spyOn( history, 'push' );
    const store = createMockStore({});
    const id = clans[2].id;
    const updates = { leader: 'Cratonie' }
    
    store.dispatch( startEditClan( id, updates ) ).then(() => {
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: EDIT_CLAN,
            id,
            updates
        });

        expect( pushSpy ).toHaveBeenLastCalledWith( '/clans' );

        return database.ref( `clans/${ id }` ).once( 'value' );
    }).then( ( snapshot ) => {
        expect( snapshot.val().leader ).toBe( updates.leader );
        done();
    });
});


// Start Remove Clan
test( 'should remove clan from db', ( done ) => {
    const store = createMockStore({});
    const id = clans[1].id;

    store.dispatch( startRemoveClan( id ) ).then(() => {
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: REMOVE_CLAN,
            id
        });

        return database.ref( `clans/${ id }` ).once( 'value' );
    }).then( ( snapshot ) => {
        expect( snapshot.val() ).toBeFalsy();
        done();
    });
});;


// Set Clan Loading
test( 'should set clan loading action object', () => {
    const action = setClanLoading();

    expect( action ).toEqual({
        type: SET_CLAN_LOADING
    });
});


// Clear Clan Loading
test( 'should generate clear clan loading', () => {
    const action = clearClanLoading();

    expect( action ).toEqual({
        type: CLEAR_CLAN_LOADING
    });
});