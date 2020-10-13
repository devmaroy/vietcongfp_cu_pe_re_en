import React from 'react';
import { shallow } from 'enzyme';
import { ClanItem } from '../../../components/clan/ClanItem';
import clans from '../../fixtures/clans';

test( 'should render ClanItem correctly', () => {
    const wrapper = shallow(
        <ClanItem
            clan={ clans[0] }
            startRemoveClan={ () => {} }
        />  
    );

    expect( wrapper ).toMatchSnapshot();
});

test( 'should show remove button if authenticated', () => {
    const wrapper = shallow(
        <ClanItem
            clan={ clans[0] }
            startRemoveClan={ () => {} }
            isAuthenticated={ true }
        />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( 'button' ).exists() ).toBeTruthy();
});

test( 'should not show remove button if not authenticated', () => {
    const wrapper = shallow(
        <ClanItem
            clan={ clans[0] }
            startRemoveClan={ () => {} }
            isAuthenticated={ false }
        />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( 'button' ).exists() ).toBeFalsy();
});

test( 'should call startRemoveClan', () => {
    const startRemoveClan = jest.fn();

    const wrapper = shallow(
        <ClanItem
            clan={ clans[0] }
            startRemoveClan={ startRemoveClan }
            isAuthenticated={ true }
        />  
    );

    wrapper.find( 'button' ).simulate( 'click' );

    expect( startRemoveClan ).toHaveBeenLastCalledWith( clans[0].id );
});