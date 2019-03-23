import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectFieldGroup from '../common/SelectFieldGroup';
import validator from 'validator';
import Spinner from '../common/Spinner';
import moment from 'moment';
import countries from '../../utils/countries';

export class ClanForm extends React.Component {
    state = {
        tag: this.props.clan ? this.props.clan.tag : '',
        name: this.props.clan ? this.props.clan.name : '',
        country: this.props.clan ? this.props.clan.country : '',
        leader: this.props.clan ? this.props.clan.leader : '',
        url: this.props.clan ? this.props.clan.url : '',
        eslName: this.props.clan ? this.props.clan.eslName : '',
        eslUrl: this.props.clan ? this.props.clan.eslUrl : '',
        createdAt: this.props.clan ? this.props.clan.createdAt : moment(),
        errors: {}
    };

    handleValidation = () => {
        const errors = {};
        let formIsValid = true;

        // Tag
        if ( ! this.state.tag ) {
            formIsValid = false;
            errors[ 'tag' ] = 'Tag cannot be empty';
        }

        // Name
        if ( ! this.state.name ) {
            formIsValid = false;
            errors[ 'name' ] = 'Name cannot be empty';
        }

        // Country
        if ( ! this.state.country ) {
            formIsValid = false;
            errors[ 'country' ] = 'Country must be provided';
        }

        // Leader
        if ( ! this.state.leader ) {
            formIsValid = false;
            errors[ 'leader' ] = 'Leader cannot be empty';
        }

        // Url
        if ( ! this.state.url ) {
            formIsValid = false;
            errors[ 'url' ] = 'Url cannot be empty';
        } else if ( ! validator.isURL( this.state.url )  ) {
            formIsValid = false;
            errors[ 'url' ] = 'Url must be valid';
        }

        // ESL Url
        if ( this.state.eslUrl ) {
            if ( ! validator.isURL( this.state.eslUrl ) ) {
                formIsValid = false;
                errors[ 'eslUrl' ] = 'ESL url must be valid';
            }
        }

        this.setState( () => ( { errors } ) );

        return formIsValid;
    };

    handleChange = ( e ) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState( () => ( { [ name ]: value } ) );
    };

    onSubmit = ( e ) => {
        e.preventDefault();

        if ( this.handleValidation() ) {
            const clanData = {
                tag: this.state.tag,
                name: this.state.name,
                country: this.state.country,
                leader: this.state.leader,
                url: this.state.url,
                eslName: this.state.eslName,
                eslUrl: this.state.eslUrl,
                createdAt: this.state.createdAt.valueOf()
            };
            
            this.props.onSubmit( clanData );
        }
    }

    render() {
        const { errors } = this.state;

        return (
            <form onSubmit={ this.onSubmit } className="form" noValidate>
                <div className="input-group">
                    <div className="input-group__item">
                        <TextFieldGroup 
                            name="tag"
                            placeholder="Tag"
                            value={ this.state.tag }
                            onChange={ this.handleChange }
                            error={ errors.tag }
                            className="text-input"
                        />
                    </div>
                </div>
                <div className="input-group">
                    <div className="input-group__item">
                        <TextFieldGroup 
                            name="name"
                            placeholder="Name"
                            value={ this.state.name }
                            onChange={ this.handleChange }
                            error={ errors.name }
                            className="text-input"
                        />
                    </div>
                </div>
                <div className="input-group">
                    <div className="input-group__item">
                        <SelectFieldGroup
                            name="country"
                            value={ this.state.country }
                            options={ countries }
                            onChange={ this.handleChange }
                            className="select"
                        />
                    </div>
                </div>
                <div className="input-group">
                    <div className="input-group__item">
                        <TextFieldGroup 
                            name="leader"
                            placeholder="Leader"
                            value={ this.state.leader }
                            onChange={ this.handleChange }
                            error={ errors.leader }
                            className="text-input"
                        />
                    </div>
                </div>
                <div className="input-group">
                    <div className="input-group__item">
                        <TextFieldGroup 
                            name="url"
                            type="url"
                            placeholder="Website"
                            value={ this.state.url }
                            onChange={ this.handleChange }
                            error={ errors.url }
                            className="text-input"
                        />
                    </div>
                </div>
                <div className="input-group">
                    <div className="input-group__item">
                        <TextFieldGroup 
                            name="eslName"
                            placeholder="ESL Clan name"
                            value={ this.state.eslName }
                            onChange={ this.handleChange }
                            error={ errors.eslName }
                            className="text-input"
                        />
                    </div>
                </div>
                <div className="input-group">
                    <div className="input-group__item">
                        <TextFieldGroup 
                            name="eslUrl"
                            type="url"
                            placeholder="ESL Clan website"
                            value={ this.state.eslUrl }
                            onChange={ this.handleChange }
                            error={ errors.eslUrl }
                            className="text-input"
                        />
                    </div>
                </div>
                <div className="form__meta">
                    <button className="button">Save Clan</button>
                </div>
            </form>
        );
    };
};

ClanForm.propTypes = {
    clan: PropTypes.object,
    onSubmit: PropTypes.func.isRequired
};

export default ClanForm;