import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';

import config from './../../../config';

import logo from './../../../assets/images/logo.svg';
import logoDark from './../../../assets/images/logo-dark.svg';

const LogoSection = () => {
    const customization = useSelector((state) => state.customization);

    return (
        <React.Fragment>
            <Link component={RouterLink} to={config.defaultPath}>
                {customization.navType === 'light' && <img src={logo} alt="Berry" width="100" />}
                {customization.navType === 'dark' && <img src={logoDark} alt="Berry" width="100" />}
            </Link>
        </React.Fragment>
    );
};

export default LogoSection;
