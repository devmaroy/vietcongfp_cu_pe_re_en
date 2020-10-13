import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../../../components/common/Spinner';

test( 'should correctly render Spinner', () => {
    const wrapper = shallow( <Spinner /> );

    expect( wrapper ).toMatchSnapshot();
});