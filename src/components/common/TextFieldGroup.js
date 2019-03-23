import React from 'react';
import PropTypes from 'prop-types';

const TextFieldGroup = ( { name, placeholder, value, error, info, type, onChange, disabled, className } ) => {
    return (
        <div>
            <input
                type={ type }
                placeholder={ placeholder }
                name={ name }
                value={ value }
                onChange={ onChange }
                disabled={ disabled }
                className={ className }
            />
            { info && <small>{ info }</small> }
            { error && <div>{ error }</div> }
        </div>
    );
};

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    className: PropTypes.string
};
  
TextFieldGroup.defaultProps = {
    type: 'text'
};

export default TextFieldGroup;