import React from 'react';
import { shallow } from 'enzyme';
import { EditPostPage } from '../../../components/post/EditPostPage';
import PostForm from '../../../components/post/PostForm';
import Spinner from '../../../components/common/Spinner';
import posts from '../../fixtures/posts';

test( 'should render correctly EditPostPage with spinner', () => {
    const post = {
        post: {},
        isPostLoading: true
    }

    const wrapper = shallow(
        <EditPostPage
            startGetPostById={ () => {} }
            startRemovePost={ () => {} }
            startEditPost={ () => {} }
            post={ post }
            match={ { params: { id: '1' } } }
        />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( Spinner ).exists() ).toBeTruthy();
});

test( 'should render correctly EditPostPage without spinner', () => {
    const post = {
        post: posts[0],
        isPostLoading: false
    }

    const wrapper = shallow(
        <EditPostPage
            startGetPostById={ () => {} }
            startRemovePost={ () => {} }
            startEditPost={ () => {} }
            post={ post }
            match={ { params: { id: '1' } } }
        />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( Spinner ).exists() ).toBeFalsy();
});

test( 'should render PostForm correctly', () => {
    const post = {
        post: posts[0],
        isPostLoading: false
    }

    const wrapper = shallow(
        <EditPostPage
            startGetPostById={ () => {} }
            startRemovePost={ () => {} }
            startEditPost={ () => {} }
            post={ post }
            match={ { params: { id: '1' } } }
        />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( PostForm ).exists() ).toBeTruthy();
});

test( 'should call startGetPost', () => {
    const post = {
        post: posts[0],
        isPostLoading: false
    }

    const startGetPostById = jest.fn();

    const wrapper = shallow(
        <EditPostPage
            startGetPostById={ startGetPostById }
            startRemovePost={ () => {} }
            startEditPost={ () => {} }
            post={ post }
            match={ { params: { id: '1' } } }
        />
    );

    expect( startGetPostById ).toHaveBeenCalled();
});

test( 'should handle startEditPost', () => {
    const startEditPost = jest.fn();

    const post = {
        post: posts[1],
        isPostLoading: false
    };

    const wrapper = shallow(
        <EditPostPage
            startGetPostById={ () => {} }
            startEditPost={ startEditPost }
            startRemovePost={ () => {} }
            post={ post }
            match={ { params: { id: posts[1].id } } }
        />
    );

    wrapper.find( PostForm ).prop( 'onSubmit' )( posts[1] );

    expect( startEditPost ).toHaveBeenLastCalledWith( posts[1].id, posts[1] );
});

test( 'should handle startRemovePost', () => {
    const startRemovePost = jest.fn();

    const post = {
        post: posts[1],
        isPostLoading: false
    };

    const wrapper = shallow(
        <EditPostPage
            startGetPostById={ () => {} }
            startEditPost={ () => {} }
            startRemovePost={ startRemovePost }
            post={ post }
            match={ { params: { id: posts[1].id } } }
        />
    );

    wrapper.find( 'button' ).simulate( 'click' );

    expect( startRemovePost ).toHaveBeenLastCalledWith( posts[1].id );
});