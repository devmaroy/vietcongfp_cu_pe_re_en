import React from 'react';
import { shallow } from 'enzyme';
import { AddPostPage } from '../../../components/post/AddPostPage';
import PostForm from '../../../components/post/PostForm';
import posts from '../../fixtures/posts';

test( 'should render AddPostPage correctly', () => {
    const wrapper = shallow(
        <AddPostPage
            startAddPost={ () => {} }
        />
    );

    expect( wrapper ).toMatchSnapshot();
});

test( 'should render PostForm correctly', () => {
    const wrapper = shallow(
        <AddPostPage
            startAddPost={ () => {} }
        />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( PostForm ).exists() ).toBeTruthy();
});

test( 'should handle onSubmit', () => {
    const startAddPost = jest.fn();

    const wrapper = shallow(
        <AddPostPage
            startAddPost={ startAddPost }
        />
    );

    wrapper.find( PostForm ).prop( 'onSubmit' )( posts[1] );

    expect( startAddPost ).toHaveBeenLastCalledWith( posts[1] );
});