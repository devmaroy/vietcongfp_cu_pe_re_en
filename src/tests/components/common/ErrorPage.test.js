import React from 'react';
import { shallow } from 'enzyme';
import ErrorPage from '../../../components/common/ErrorPage';

test( 'should correctly render ErrorPage', () => {
    const wrapper = shallow( <ErrorPage /> );

    expect( wrapper ).toMatchSnapshot();
});