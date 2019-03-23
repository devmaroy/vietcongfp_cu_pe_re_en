import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startGetClans } from '../../actions/clan';
import Spinner from '../common/Spinner';
import ClanList from './ClanList';

export class ClanPage extends React.Component {
    componentDidMount() {
        this.props.startGetClans();
    };

    render() {
        const { clans, isClanLoading } = this.props.clan;
        let clansContent;

        if ( clans === null || isClanLoading ) {
            clansContent = <Spinner />;
        } else {
            clansContent = <ClanList clans={ clans } />;
        }

        return (
            <div className="content-container">
                <div className="page">
                    <h1 className="page__title">Clans</h1>  
                    { clansContent }
                </div>
            </div>
        );
    }
}

ClanPage.propTypes = {
    startGetClans: PropTypes.func.isRequired,
    clan: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
    clan: state.clan
});

const mapDispatchToProps = ( dispatch ) => ({
    startGetClans: () => dispatch( startGetClans() )
});

export default connect( mapStateToProps, mapDispatchToProps )( ClanPage );