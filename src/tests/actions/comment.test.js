import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import history from '../../routers/history';
import {  
    startGetCommentsByPostId,
    startAddComment,
    startRemoveComment,
    setCommentLoading,
    clearCommentLoading
} from '../../actions/comment';
import { 
    GET_COMMENTS,
    ADD_COMMENT,
    REMOVE_COMMENT,
    SET_COMMENT_LOADING,
    CLEAR_COMMENT_LOADING
} from '../../actions/types';
import database from '../../firebase/firebase';
import comments from '../fixtures/comments';

const createMockStore = configureMockStore( [ thunk ] );

beforeEach( ( done ) => {
    const commentsData = {};

    comments.forEach( ( { id, name, body, postId, createdAt } ) => {
        commentsData[ id ] = { name, body, postId, createdAt };
    });

    database.ref( 'comments' ).set( commentsData ).then(() => {
        done();
    });
});


// Start Get Comments By Post Id
test( 'should fetch comments by postId from db', ( done ) => {
    const store = createMockStore({});
    const postId = comments[0].postId;

    store.dispatch( startGetCommentsByPostId( postId ) ).then(() => {
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: SET_COMMENT_LOADING
        });

        expect( actions[1] ).toEqual({
            type: GET_COMMENTS,
            comments: [ comments[0], comments[1] ]
        });

        expect( actions[2] ).toEqual({
            type: CLEAR_COMMENT_LOADING
        });

        done();
    });
});


// Start Add Comment
test( 'should add comment to db', ( done ) => {
    const store = createMockStore({});
    const commentData = {
        name: 'Pete007',
        body: 'Wow... great new info!',
        postId: '1',
        createdAt: 1600
    };

    store.dispatch( startAddComment( commentData ) ).then(() => {
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: ADD_COMMENT,
            comment: {
                id: expect.any( String ),
                ...commentData
            }
        });
        
        return database.ref( `comments/${ actions[0].comment.id }` ).once( 'value' );
    }).then( ( snapshot ) => {
        expect( snapshot.val() ).toEqual( commentData );
        done();
    });
});


// Start Remove Comment
test( 'should remove comment from db', ( done ) => {
    const store = createMockStore({});
    const id = comments[1].id;

    store.dispatch( startRemoveComment( id ) ).then(() => {
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: REMOVE_COMMENT,
            id
        });

        return database.ref( `comments/${ id }` ).once( 'value' );
    }).then( ( snapshot ) => {
        expect( snapshot.val() ).toBeFalsy(); 
        done();
    });
});


// Set Comment Loading
test( 'should generate set comment loading', () => {
    const action = setCommentLoading();

    expect( action ).toEqual({
        type: SET_COMMENT_LOADING
    });
});


// Clear Comment Loading
test( 'should generate clear comment loading', () => {
    const action = clearCommentLoading();

    expect( action ).toEqual({
        type: CLEAR_COMMENT_LOADING
    });
});