import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startRemoveClan } from '../../actions/clan';
import { Link } from 'react-router-dom';
import { FlagIcon } from "react-flag-kit";

export const ClanItem = ( props ) => {
    const { clan, isAuthenticated, startRemoveClan } = props;

    const onRemove = ( id ) => {
        startRemoveClan( id );
    };

    return (
        <tr className="clan">
            <td>
                <FlagIcon 
                    code={ clan.country } 
                    size={ 26 } 
                    title={ `Country flag ${ clan.country }` }
                />
            </td>
            <td>{ clan.tag }</td>
            <td>{ clan.name }</td>
            <td>{ clan.leader }</td>
            <td>
                <a href={ clan.url }>{ clan.url }</a>
            </td>
            <td>
                { ( clan.eslName && clan.eslUrl ) ? <a href={ clan.eslUrl }>{ clan.eslName }</a> : 'no' }
            </td>
            { 
                isAuthenticated && (
                    <td>
                        <Link to={ `/clans/${ clan.id }/edit` }>
                            <img src="/images/icons/edit.svg" alt="Edit icon" className="icon edit-icon" />
                        </Link>
                        <button onClick={ onRemove.bind( this, clan.id ) }>
                            <img src="/images/icons/remove.svg" alt="Remove icon" className="icon remove-icon"/>
                        </button>
                    </td>
                )
            }
        </tr>
    )
};

ClanItem.propTypes = {
    clan: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    startRemoveClan: PropTypes.func.isRequired
}

const mapStateToProps = ( state ) => ({
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = ( dispatch ) => ({
    startRemoveClan: ( id ) => dispatch( startRemoveClan( id ) )
});

export default connect( mapStateToProps, mapDispatchToProps )( ClanItem );