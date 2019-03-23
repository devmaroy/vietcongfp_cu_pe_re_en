import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startAddClan } from '../../actions/clan';
import ClanForm from './ClanForm';

export class AddClanPage extends React.Component {
    onSubmit = ( clanData ) => {
        this.props.startAddClan( clanData ); 
    };

    render() {
        return (
            <div className="content-container">
                <div className="page">
                    <h2>Create Clan</h2>
                    <ClanForm 
                        onSubmit={ this.onSubmit }
                    />
                </div>
            </div>
        )
    };
};

AddClanPage.propTypes = {
    startAddClan: PropTypes.func.isRequired
};

const mapDispatchToProps = ( dispatch ) => ({
    startAddClan: ( clanData ) => dispatch( startAddClan( clanData ) )
});

export default connect( undefined, mapDispatchToProps )( AddClanPage );