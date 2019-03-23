import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../../components/layout/Footer';

test( 'should correctly render Footer', () => {
    const wrapper = shallow( <Footer /> );

    expect( wrapper ).toMatchSnapshot();
});