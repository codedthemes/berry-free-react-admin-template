import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Divider, List, Typography } from '@material-ui/core';

// project imports
import NavItem from './../NavItem';
import NavCollapse from './../NavCollapse';

// style constant
const useStyles = makeStyles((theme) => ({
    menuCaption: {
        ...theme.typography.menuCaption
    },
    subMenuCaption: {
        ...theme.typography.subMenuCaption
    },
    menuDivider: {
        marginTop: '2px',
        marginBottom: '10px'
    }
}));

//-----------------------|| SIDEBAR MENU LIST GROUP ||-----------------------//

const NavGroup = ({ item }) => {
    const classes = useStyles();

    // menu list collapse & items
    const items = item.children.map((menu) => {
        switch (menu.type) {
            case 'collapse':
                return <NavCollapse key={menu.id} menu={menu} level={1} />;
            case 'item':
                return <NavItem key={menu.id} item={menu} level={1} />;
            default:
                return (
                    <Typography key={menu.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return (
        <React.Fragment>
            <List
                subheader={
                    item.title && (
                        <Typography variant="caption" className={classes.menuCaption} display="block" gutterBottom>
                            {item.title}
                            {item.caption && (
                                <Typography variant="caption" className={classes.subMenuCaption} display="block" gutterBottom>
                                    {item.caption}
                                </Typography>
                            )}
                        </Typography>
                    )
                }
            >
                {items}
            </List>

            {/* group divider */}
            <Divider className={classes.menuDivider} />
        </React.Fragment>
    );
};

NavGroup.propTypes = {
    item: PropTypes.object
};

export default NavGroup;
