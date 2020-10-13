import React from 'react';
import { shallow } from 'enzyme';
import { CommentPage } from '../../../components/comment/CommentPage';
import AddCommentPage from '../../../components/comment/AddCommentPage';
import CommentList from '../../../components/comment/CommentList';
import Spinner from '../../../components/common/Spinner';

test( 'should render correctly CommentPage with spinner', () => {
    const post = {
        comments: [],
        isCommentLoading: true
    };

    const wrapper = shallow(
        <CommentPage
            post={ post }
            startGetCommentsByPostId={ () => {} }
        />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( Spinner ).exists() ).toBeTruthy();
});

test( 'should not render CommentPage with spinner', () => {
    const post = {
        comments: [],
        isCommentLoading: false
    };

    const wrapper = shallow(
        <CommentPage
            post={ post }
            startGetCommentsByPostId={ () => {} }
        />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( Spinner ).exists() ).toBeFalsy();
});

test( 'should render correctly AddCommentPage', () => {
    const post = {
        comments: [],
        isCommentLoading: false
    }; 

    const wrapper = shallow(
        <CommentPage
            post={ post }
            startGetCommentsByPostId={ () => {} }
        />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( AddCommentPage ).exists() ).toBeTruthy();
});

test( 'should render correctly CommentList', () => {
    const post = {
        comments: [],
        isCommentLoading: false
    }; 

    const wrapper = shallow(
        <CommentPage
            post={ post }
            startGetCommentsByPostId={ () => {} }
        />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( CommentList ).exists() ).toBeTruthy();
});