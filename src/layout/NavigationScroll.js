import {useEffect} from 'react';
import {withRouter} from 'react-router-dom';

const NavigationScroll = ({children, location: {pathname}}) => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [pathname]);

    return children || null;
};

export default withRouter(NavigationScroll);
