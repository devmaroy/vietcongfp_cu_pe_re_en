// Clan Actions

import database from '../firebase/firebase';
import history from '../routers/history';
import { 
    GET_CLANS,
    GET_CLAN,
    ADD_CLAN,
    EDIT_CLAN,
    REMOVE_CLAN,
    SET_CLAN_LOADING,
    CLEAR_CLAN_LOADING,
    GET_ERRORS
} from './types';


// Get Clans
export const startGetClans = () => {
    return ( dispatch ) => {
        dispatch( setClanLoading() );

        return database
            .ref( 'clans' )
            .orderByChild( 'createdAt' )
            .once( 'value' )
            .then( ( snapshot ) => {
                const clans = [];

                snapshot.forEach( ( childSnapshot ) => {
                    clans.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });

                dispatch({
                    type: GET_CLANS,
                    clans
                });
    
                dispatch( clearClanLoading() );
            })
            .catch( ( err ) => {
                // Simple redirect to non existent route
                history.push( '/oops' );
            });
    };
};


// Get Clan
export const startGetClanById = ( id ) => {
    return ( dispatch ) => {
        dispatch( setClanLoading() );

        return database
            .ref( `clans/${ id }` )
            .once( 'value' )
            .then( ( snapshot ) => {
                if ( snapshot.exists() ) {
                    const clan = {
                        id: snapshot.key,
                        ...snapshot.val()
                    };
        
                    dispatch({
                        type: GET_CLAN,
                        clan
                    });
    
                    dispatch( clearClanLoading() );
                } else {
                    // Simple redirect to non existent route
                    history.push( '/not-found' );
                }
            })
            .catch( ( err ) => {
                // Simple redirect to non existent route
                history.push( '/oops' );
            });
    };
};


// Add Clan
export const startAddClan = ( clanData ) => {
    return ( dispatch ) => {
        return database
            .ref( 'clans' )
            .push( clanData )
            .then( ( ref ) => {
                dispatch({
                    type: ADD_CLAN,
                    clan: {
                        id: ref.key,
                        ...clanData 
                    }
                });
    
                history.push( '/clans' );
            })
            .catch( ( err ) => {
                // Simple redirect to non existent route
                history.push( '/oops' );
            });
    };
} ;


// Edit Clan 
export const startEditClan = ( id, updates ) => {
    return ( dispatch ) => {
        return database
            .ref( `clans/${ id }` )
            .update( updates )
            .then( ( ref ) => {
                dispatch({
                    type: EDIT_CLAN,
                    id,
                    updates
                });
    
                history.push( '/clans' );
            })
            .catch( ( err ) => {
                // Simple redirect to non existent route
                history.push( '/oops' );
            });
    };
};


// Remove Clan
export const startRemoveClan = ( id ) => {
    return ( dispatch ) => {
        return database 
            .ref( `clans/${ id }` )
            .remove()
            .then( () => {
                dispatch({
                    type: REMOVE_CLAN,
                    id
                });
            })
            .catch( ( err ) => {
                // Simple redirect to non existent route
                history.push( '/oops' );
            });
    };
};


// Clan Loading
export const setClanLoading = () => ({
    type: SET_CLAN_LOADING
});


// Clear Clan Loading
export const clearClanLoading = () => ({
    type: CLEAR_CLAN_LOADING
});