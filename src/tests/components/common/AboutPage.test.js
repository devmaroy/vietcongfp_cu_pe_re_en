import React from 'react';
import { shallow } from 'enzyme';
import AboutPage from '../../../components/common/AboutPage';

test( 'should correctly render AboutPage', () => {
    const wrapper = shallow( <AboutPage /> );

    expect( wrapper ).toMatchSnapshot();
});