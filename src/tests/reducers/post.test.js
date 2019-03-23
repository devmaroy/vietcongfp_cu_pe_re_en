import postReducer from '../../reducers/post';
import posts from '../fixtures/posts';
import comments from '../fixtures/comments';

import {
    GET_POSTS,
    GET_POST,
    ADD_POST,
    EDIT_POST,
    REMOVE_POST,
    GET_COMMENTS,
    ADD_COMMENT,
    REMOVE_COMMENT,
    SET_POST_LOADING,
    CLEAR_POST_LOADING,
    SET_COMMENT_LOADING,
    CLEAR_COMMENT_LOADING
} from '../../actions/types';

// Default values
test( 'should setup default post values', () => {
    const action = {
        type: '@@INIT'
    };

    const state = postReducer( undefined, action );

    expect( state ).toEqual({
        posts: [],
        post: {},
        comments: [],
        isPostLoading: false,
        isCommentLoading: false
    });
});


// Get Posts
test( 'should get posts', () => {
    const action = {
        type: GET_POSTS,
        posts
    };

    const state = postReducer( undefined, action );

    expect( state.posts ).toEqual( posts );
});


// Get Post
test( 'should get post', () => {
    const action = {
        type: GET_POST,
        post: posts[0]
    };

    const state = postReducer( undefined, action );

    expect( state.post ).toEqual( posts[0] );
});


// Add Post
test( 'should add post', () => {
    const currentState = {
        posts,
        post: {},
        comments: [],
        isPostLoading: false,
        isCommentLoading: false
    }

    const post = {
        title: 'New post',
        body: 'Post body here',
        name: 'Jen',
        createdAt: 2000
    };

    const action = {
        type: ADD_POST,
        post
    };

    const state = postReducer( currentState, action );

    expect( state.posts ).toEqual( [ post, ...posts ] );
});


// Edit Post
test( 'should edit post', () => {
    const currentState = {
        posts,
        post: {},
        comments: [],
        isPostLoading: false,
        isCommentLoading: false
    }

    const title = 'Awesome title title!';

    const action = {
        type: EDIT_POST,
        id: posts[1].id,
        updates: { title }
    };

    const state = postReducer( currentState, action );

    expect( state.posts[1].title ).toBe( title );
});


// Edit Post
test( 'should not edit post', () => {
    const currentState = {
        posts,
        post: {},
        comments: [],
        isPostLoading: false,
        isCommentLoading: false
    }

    const title = 'Awesome title title!';

    const action = {
        type: EDIT_POST,
        id: '-1',
        updates: { title }
    };

    const state = postReducer( currentState, action );

    expect( state.posts ).toEqual( posts );
});


// Remove Post
test( 'should remove post', () => {
    const currentState = {
        posts,
        post: {},
        comments: [],
        isPostLoading: false,
        isCommentLoading: false
    }

    const action = {
        type: REMOVE_POST,
        id: posts[1].id
    };

    const state = postReducer( currentState, action );

    expect( state.posts ).toEqual( [ posts[0], posts[2], posts[3], posts[4] ] );
});


// Remove Post
test( 'should not remove post', () => {
    const currentState = {
        posts,
        post: {},
        comments: [],
        isPostLoading: false,
        isCommentLoading: false
    }

    const action = {
        type: REMOVE_POST,
        id: '-25'
    };

    const state = postReducer( currentState, action );

    expect( state.posts ).toEqual( posts );
});


// Get Comments
test( 'should get comments', () => {
    const currentState = {
        posts,
        post: {},
        comments: [],
        isPostLoading: false,
        isCommentLoading: false
    }

    const action = {
        type: GET_COMMENTS,
        comments
    };

    const state = postReducer( currentState, action );

    expect( state.comments ).toEqual( comments );
});


// Add Comment
test( 'should add comment', () => {
    const currentState = {
        posts,
        post: {},
        comments,
        isPostLoading: false,
        isCommentLoading: false
    }

    const comment = {
        name: 'Jen',
        body: 'Post body here',
        postId: '2',
        createdAt: 2000
    };

    const action = {
        type: ADD_COMMENT,
        comment
    };

    const state = postReducer( currentState, action );

    expect( state.comments ).toEqual( [ comment, ...comments ] );
});


// Remove Comment
test( 'should remove comment', () => {
    const currentState = {
        posts,
        post: {},
        comments,
        isPostLoading: false,
        isCommentLoading: false
    }

    const action = {
        type: REMOVE_COMMENT,
        id: comments[1].id
    };

    const state = postReducer( currentState, action );

    expect( state.comments ).toEqual( [ comments[0], comments[2], comments[3], comments[4] ] );
});


// Remove Comment
test( 'should not remove comment', () => {
    const currentState = {
        posts,
        post: {},
        comments,
        isPostLoading: false,
        isCommentLoading: false
    };

    const action = {
        type: REMOVE_COMMENT,
        id: '-66'
    };

    const state = postReducer( currentState, action );

    expect( state.comments ).toEqual( comments );
});


// Set Post Loading
test( 'should set post loading', () => {
    const action = {
        type: SET_POST_LOADING
    };

    const state = postReducer( undefined, action );

    expect( state.isPostLoading ).toEqual( true );
});


// Clear Post Loading
test( 'should clear post loading', () => {
    const currentState = {
        posts: [],
        post: {},
        comments: [],
        isPostLoading: true,
        isCommentLoading: false
    };

    const action = {
        type: CLEAR_POST_LOADING
    };

    const state = postReducer( undefined, action );

    expect( state.isPostLoading ).toEqual( false );
});


// Clear Comment Loading
test( 'should clear comment loading', () => {
    const currentState = {
        posts: [],
        post: {},
        comments: [],
        isPostLoading: false,
        isCommentLoading: true
    };

    const action = {
        type: CLEAR_COMMENT_LOADING
    };

    const state = postReducer( undefined, action );

    expect( state.isCommentLoading ).toEqual( false );
});


// Set Comment Loading
test( 'should set comment loading', () => {
    const action = {
        type: SET_COMMENT_LOADING
    };

    const state = postReducer( undefined, action );

    expect( state.isCommentLoading ).toEqual( true );
});