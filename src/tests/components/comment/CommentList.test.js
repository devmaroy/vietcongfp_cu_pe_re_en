import React from 'react';
import { shallow } from 'enzyme';
import CommentList from '../../../components/comment/CommentList';
import comments from '../../fixtures/comments';

test( 'should render CommentList with empty message', () => {
    const wrapper = shallow(
        <CommentList
            comments={ [] }
        />
    );

    expect( wrapper ).toMatchSnapshot();
});

test( 'should render CommentList correctly with data', () => {
    const wrapper = shallow(
        <CommentList
            comments={ comments }
        />  
    );

    expect( wrapper ).toMatchSnapshot();
});

test( 'should show Pagination if length of comments is more than commentsPerPage in state', () => {
    const wrapper = shallow(
        <CommentList
            comments={ comments }
        />  
    );

    wrapper.setState({
        commentsPerPage: 1
    });

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( '.site-pagination' ).exists() ).toBeTruthy();
});

test( 'should not show Pagination if length of comments is less than commentsPerPage in state', () => {
    const wrapper = shallow(
        <CommentList
            comments={ comments }
        />  
    );

    wrapper.setState({
        commentsPerPage: 20
    });

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( '.site-pagination' ).exists() ).toBeFalsy();
});