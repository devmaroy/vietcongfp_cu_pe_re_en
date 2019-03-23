import React from 'react';
import { shallow } from 'enzyme';
import ClanList from '../../../components/clan/ClanList';
import clans from '../../fixtures/clans';

test( 'should render ClanList with empty message', () => {
    const wrapper = shallow(
        <ClanList
            clans={ [] }
        />
    );

    expect( wrapper ).toMatchSnapshot();
});

test( 'should render ClanList correctly with data', () => {
    const wrapper = shallow(
        <ClanList 
            clans={ clans }
        />
    );

    expect( wrapper ).toMatchSnapshot();
});

test( 'should show Pagination if length of clans is more than clansPerPage in state', () => {
    const wrapper = shallow(
        <ClanList
            clans={ clans }
        />
    );

    wrapper.setState({
        clansPerPage: 1
    });

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( '.site-pagination' ).exists() ).toBeTruthy();
});

test( 'should not show Pagination if length of clans is less than clansPerPage in state', () => {
    const wrapper = shallow(
        <ClanList
            clans={ clans }
        />
    );

    wrapper.setState({
        clansPerPage: 20
    });

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( '.site-pagination' ).exists() ).toBeFalsy();
});