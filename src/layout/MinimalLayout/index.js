import PropTypes from 'prop-types';
import React from 'react';

// project imports
import Customization from './../Customization';

//-----------------------|| MINIMAL LAYOUT ||-----------------------//

const MinimalLayout = (props) => {
    return (
        <React.Fragment>
            {props.children}
            <Customization />
        </React.Fragment>
    );
};

MinimalLayout.propTypes = {
    children: PropTypes.node
};

export default MinimalLayout;
