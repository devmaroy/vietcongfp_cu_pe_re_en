import React from 'react';
import PropTypes from 'prop-types';

const SelectFieldGroup = ( { name, options, className, onChange, value, info } ) => {
    return (
        <div>
            <select
                name={ name }
                value={ value }
                className={ className }
                onChange={ onChange }
            >
                { 
                    options.length > 0 && (
                        options.map( ( option, index ) => <option key={ index } value={ option.key }>{ option.text }</option> )
                    )
                }
            </select>
            { info && <small>{ info }</small> }
        </div>
    );
};

SelectFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string
};

export default SelectFieldGroup;