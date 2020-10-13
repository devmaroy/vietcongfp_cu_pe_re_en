// Comment Actions

import database from '../firebase/firebase';
import history from '../routers/history';
import { 
    GET_COMMENTS,
    ADD_COMMENT,
    REMOVE_COMMENT,
    SET_COMMENT_LOADING,
    CLEAR_COMMENT_LOADING,
    GET_ERRORS
} from './types';


// Get Comments By Post Id
export const startGetCommentsByPostId = ( postId ) => {
    return ( dispatch ) => {
        dispatch( setCommentLoading() );

        return database
            .ref( 'comments' )
            .orderByChild( 'createdAt' )
            .once( 'value' )
            .then( ( snapshot ) => {
                const comments = [];
            
                snapshot.forEach( ( childSnapshot ) => {
                    if ( childSnapshot.val().postId === postId ) {
                        comments.push({
                            id: childSnapshot.key,
                            ...childSnapshot.val()
                        });
                    }
                });
    
                dispatch({
                    type: GET_COMMENTS,
                    comments
                });
    
                dispatch( clearCommentLoading() );
            })
            .catch( ( err ) => {
                // Simple redirect to non existent route
                history.push( '/oops' );
            });
    };
};


// Add Comment
export const startAddComment = ( commentData ) => {
    return ( dispatch ) => {
        return database
            .ref( 'comments' ) 
            .push( commentData )
            .then( ( ref ) => {
                dispatch({
                    type: ADD_COMMENT,
                    comment: {
                        id: ref.key,
                        ...commentData
                    }
                });
            })
            .catch( ( err ) => {
                // Simple redirect to non existent route
                history.push( '/oops' );
            });
    };
};


// Remove Comment
export const startRemoveComment = ( id ) => {
    return ( dispatch ) => {
        return database 
            .ref( `comments/${ id }` )
            .remove()
            .then(() => {
                dispatch({
                    type: REMOVE_COMMENT,
                    id
                });
            })
            .catch( ( err ) => {
                // Simple redirect to non existent route
                history.push( '/oops' );
            });
    };
};


// Comment Loading
export const setCommentLoading = () => ({
    type: SET_COMMENT_LOADING
});


// Clear Comment Loading
export const clearCommentLoading = () => ({
    type: CLEAR_COMMENT_LOADING
});