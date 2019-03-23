import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../../components/layout/Header';

const user = {
    name: 'Josh'
};

test( 'should render Header correctly for no login user', () => {
    const wrapper = shallow( 
            <Header 
                startLogout={ () => {} } 
                isAuthenticated={ false } 
                user={ {} } 
            /> 
        );

    expect( wrapper ).toMatchSnapshot();
});

test( 'should render Header correctly for logged in user', () => {
    const wrapper = shallow( 
            <Header 
                startLogout={ () => {} } 
                isAuthenticated={ true } 
                user={ user } 
            /> 
        );

    expect( wrapper ).toMatchSnapshot();
});

test( 'should call startLogout on button click ', () => {
    const startLogout = jest.fn();

    const wrapper = shallow( 
            <Header 
                startLogout={ startLogout } 
                isAuthenticated={ true } 
                user={ user } 
            /> 
        );

    wrapper.find( '.logout-link' ).simulate( 'click' );

    expect( startLogout ).toHaveBeenCalled();
});

test( 'should show header-meta if authenticated', () => {
    const startLogout = jest.fn();

    const wrapper = shallow( 
            <Header 
                startLogout={ startLogout } 
                isAuthenticated={ true } 
                user={ user } 
            /> 
        );

    expect( wrapper.find( '.header-meta' ).exists() ).toBeTruthy();
});

test( 'should not show header-meta if not authenticated', () => {
    const startLogout = jest.fn();

    const wrapper = shallow( 
            <Header 
                startLogout={ startLogout } 
                isAuthenticated={ false } 
                user={ {} } 
            /> 
        );

    expect( wrapper.find( '.header-meta' ).exists() ).toBeFalsy();
});