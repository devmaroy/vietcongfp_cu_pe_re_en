import React from 'react';
import { shallow } from 'enzyme';
import { ClanPage } from '../../../components/clan/ClanPage';
import Spinner from '../../../components/common/Spinner';
import ClanList from '../../../components/clan/ClanList';

test( 'should render correctly ClanPage with spinner', () => {
    const clan = {
        clans: [],
        isClanLoading: true
    };

    const wrapper = shallow(
        <ClanPage
            clan={ clan }
            startGetClans={ () => {} }
        />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( Spinner ).exists() ).toBeTruthy();
});

test( 'should not render ClanPage with spinner', () => {
    const clan = {
        clans: [],
        isClanLoading: false
    };

    const wrapper = shallow(
        <ClanPage
            clan={ clan }
            startGetClans={ () => {} }
        />
    );

    expect( wrapper.find( Spinner ).exists() ).toBeFalsy();
})

test( 'should render correctly ClanList', () => {
    const clan = {
        clans: [],
        isClanLoading: false
    };

    const wrapper = shallow(
        <ClanPage
            clan={ clan }
            startGetClans={ () => {} }
        />
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find( ClanList ).exists() ).toBeTruthy();
});