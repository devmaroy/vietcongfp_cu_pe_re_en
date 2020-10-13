import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startGetClanById, startEditClan } from '../../actions/clan';
import Spinner from '../common/Spinner';
import ClanForm from './ClanForm';

export class EditClanPage extends React.Component {
    componentDidMount() {
        this.props.startGetClanById( this.props.match.params.id );
    };

    onSubmit = ( updates ) => {
        this.props.startEditClan( this.props.match.params.id, updates );
    };

    render() {
        const { clan, isClanLoading } = this.props.clan;
        let clanEditContent;

        if ( clan === null || isClanLoading || Object.keys( clan ).length === 0 ) {
            clanEditContent = <Spinner />;
        } else {
            clanEditContent = (
               <div>
                    <h2>Edit Clan</h2>
                    <ClanForm
                        onSubmit={ this.onSubmit }
                        clan={ clan }
                    />
               </div>
           );
        }

        return (
            <div className="content-container">
                <div className="page">
                    { clanEditContent }
                </div>
            </div>
        )
    }
}

EditClanPage.propTypes = {
    startGetClanById: PropTypes.func.isRequired,
    startEditClan: PropTypes.func.isRequired,
    clan: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
    clan: state.clan
});

const mapDispatchToProps = ( dispatch ) => ({
    startGetClanById: ( id ) => dispatch( startGetClanById( id ) ),
    startEditClan: ( id, updates ) => dispatch( startEditClan( id, updates ) )
});

export default connect( mapStateToProps, mapDispatchToProps )( EditClanPage );