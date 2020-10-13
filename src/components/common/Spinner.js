import React from 'react';
import PropTypes from 'prop-types';

const Spinner = ( { imagePath, alt, style, classNameWrapper, classNameImg } ) => (
    <div className={ classNameWrapper }>
        <img 
            style={ style }
            src={ imagePath } 
            alt={ alt }
            className={ classNameImg }
        />
    </div>
);

Spinner.propTypes = {
    imagePath: PropTypes.string,
    alt: PropTypes.string,
    style: PropTypes.object,
    classNameWrapper: PropTypes.string,
    classNameImg: PropTypes.string
};

Spinner.defaultProps = {
    imagePath: '/images/loader.gif',
    alt: 'Loading...',
    style: { width: '80px', margin: '60px', display: 'block' }
};

export default Spinner;