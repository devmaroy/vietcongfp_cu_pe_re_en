import React from 'react';
import { shallow } from 'enzyme';
import { AddCommentPage } from '../../../components/comment/AddCommentPage';
import CommentForm from '../../../components/comment/CommentForm';
import comments from '../../fixtures/comments';

test( 'should render AddPostPage correctly', () => {
    const wrapper = shallow(
        <AddCommentPage
            startAddComment={ () => {} }
        />
    );

    expect( wrapper ).toMatchSnapshot();
});

test( 'should render CommentForm correctly', () => {
    const wrapper = shallow(
        <AddCommentPage
            startAddComment={ () => {} }
        />
    );

    expect( wrapper.find( CommentForm ).exists() ).toBeTruthy();
});