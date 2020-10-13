import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import history from '../../routers/history';
import {  
    startGetPosts,
    startGetPostById,
    startAddPost,
    startEditPost,
    startRemovePost,
    setPostLoading,
    clearPostLoading
} from '../../actions/post';
import { 
    GET_POSTS,
    GET_POST,
    ADD_POST,
    EDIT_POST,
    REMOVE_POST,
    SET_POST_LOADING,
    CLEAR_POST_LOADING
} from '../../actions/types';
import database from '../../firebase/firebase';
import posts from '../fixtures/posts';

const createMockStore = configureMockStore( [ thunk ] );

beforeEach( ( done ) => {
    const postsData = {};

    posts.forEach( ( { id, title, body, name, createdAt } ) => {
        postsData[ id ] = { title, body, name, createdAt };
    });

    database.ref( 'posts' ).set( postsData ).then(() => {
        done();
    });
});


// Start Get Posts
test( 'should fetch posts from db', ( done ) => {
    const store = createMockStore({});

    store.dispatch( startGetPosts() ).then(() => {
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: SET_POST_LOADING
        });

        expect( actions[1] ).toEqual({
            type: GET_POSTS,
            posts
        });

        expect( actions[2] ).toEqual({
            type: CLEAR_POST_LOADING
        });

        done();
    });
});


// Start Get Post By Id
test( 'should fetch post by id from db', ( done ) => {
    const store = createMockStore({});
    const id = posts[2].id;

    store.dispatch( startGetPostById( id ) ).then(() => {
        const actions = store.getActions();
    

        expect( actions[0] ).toEqual({
            type: SET_POST_LOADING
        });

        expect( actions[1] ).toEqual({
            type: GET_POST,
            post: posts[2] 
        });

        expect( actions[2] ).toEqual({
            type: CLEAR_POST_LOADING
        });

        done();
    });
});


// Start Add Post
test( 'should add post to db', ( done ) => {
    const pushSpy = jest.spyOn( history, 'push' );
    const store = createMockStore({});
    const postData = {
        title: 'Patch is here!',
        body: 'We have new patch here! Version of this patch is 6.25',
        name: 'Andy009',
        createdAt: 1500
    };

    store.dispatch( startAddPost( postData ) ).then(() => {
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: ADD_POST,
            post: {
                id: expect.any( String ),
                ...postData
            }
        });

        expect( pushSpy ).toHaveBeenLastCalledWith( '/' );

        return database.ref( `posts/${ actions[0].post.id }` ).once( 'value' );
    }).then( ( snapshot ) => {
        expect( snapshot.val() ).toEqual( postData );
        done();
    });
});


// Start Edit Post
test( 'should edit post from db', ( done ) => {
    const pushSpy = jest.spyOn( history, 'push' );
    const store = createMockStore({});
    const id = posts[2].id;
    const updates = { title: 'NO! We are not hiring!' }
    
    store.dispatch( startEditPost( id, updates ) ).then(() => {
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: EDIT_POST,
            id,
            updates
        });

        expect( pushSpy ).toHaveBeenLastCalledWith( `/posts/${ id }` );

        return database.ref( `posts/${ id }` ).once( 'value' );
    }).then( ( snapshot ) => {
        expect( snapshot.val().title ).toBe( updates.title );
        done();
    });
});


// Start Remove Post
test( 'should remove post from db', ( done ) => {
    const pushSpy = jest.spyOn(history, 'push');

    const store = createMockStore({});
    const id = posts[1].id;

    store.dispatch( startRemovePost( id ) ).then(() => {
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: REMOVE_POST,
            id
        });

        expect( pushSpy ).toHaveBeenLastCalledWith( '/' );

        return database.ref( `posts/${ id }` ).once( 'value' );
    }).then( ( snapshot ) => {
        expect( snapshot.val() ).toBeFalsy();
        done();
    });
});;


// Set Post Loading
test( 'should set post loading action object', () => {
    const action = setPostLoading();

    expect( action ).toEqual({
        type: SET_POST_LOADING
    });
});


// Clear Post Loading
test( 'should generate clear post loading', () => {
    const action = clearPostLoading();

    expect( action ).toEqual({
        type: CLEAR_POST_LOADING
    });
});