import React, {useEffect, useState} from 'react';
import {Card, CardContent, Divider, Grid, Link, makeStyles, Typography} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';

import AccountTreeTwoToneIcon from '@material-ui/icons/AccountTreeTwoTone';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import HomeIcon from '@material-ui/icons/Home';

import {gridSpacing} from '../../../store/constant';

import config from '../../../config';

const useStyles = makeStyles((theme) => ({
    link: {
        display: 'flex',
        color: theme.palette.grey[900],
        textDecoration: 'none',
        alignContent: 'center',
        alignItems: 'center'
    },
    activeLink: {
        display: 'flex',
        textDecoration: 'none',
        alignContent: 'center',
        alignItems: 'center',
        color: theme.palette.grey[500]
    },
    icon: {
        marginRight: theme.spacing(0.75),
        marginTop: '-' + theme.spacing(0.25),
        width: '1rem',
        height: '1rem',
        color: theme.palette.purple.main
    },
    content: {
        padding: '16px !important'
    },
    noPadding: {
        padding: '16px !important',
        paddingLeft: '0 !important'
    },
    card: {
        marginBottom: theme.spacing(gridSpacing)
    },
    root: {
        background: 'transparent',
        boxShadow: 'none',
        border: 'none'
    },
    titleTop: {
        marginBottom: theme.spacing(1)
    },
    titleBottom: {
        marginTop: theme.spacing(1)
    },
    divider: {
        borderColor: theme.palette.primary.main,
        marginBottom: theme.spacing(gridSpacing)
    }
}));

const Breadcrumbs = (props) => {
    const classes = useStyles();
    const {separator, title, titleBottom, icons, icon, maxItems, card, divider, rightAlign, ...rest} = props;

    const [main, setMain] = useState([]);
    const [item, setItem] = useState([]);

    useEffect(() => {
        props.navigation.items.map((item, index) => {
            if (item.type && item.type === 'group') {
                getCollapse(item, index);
            }
            return false;
        });
    });

    const getCollapse = (item) => {
        if (item.children) {
            item.children.filter((collapse) => {
                if (collapse.type && collapse.type === 'collapse') {
                    getCollapse(collapse);
                } else if (collapse.type && collapse.type === 'item') {
                    if (document.location.pathname === config.basename + collapse.url) {
                        setMain(item);
                        setItem(collapse);
                    }
                }
                return false;
            });
        }
    };

    const SeparatorIcon = separator;
    const separatorIcon = separator ? <SeparatorIcon stroke={1.5} size="1rem" /> : '/';

    let cardClass = classes.card;
    if (card === false) {
        cardClass = classes.root;
    }

    let contentClass = classes.content;
    if (card === false) {
        contentClass = classes.noPadding;
    }

    let mainContent, itemContent;
    let breadcrumbContent = '';
    let itemTitle = '';
    let CollapseIcon;
    let ItemIcon;

    if (main && main.type === 'collapse') {
        CollapseIcon = main.icon ? main.icon : AccountTreeTwoToneIcon;
        mainContent = (
            <Link component={RouterLink} to="#" variant="subtitle1" className={classes.link}>
                {icons && <CollapseIcon className={classes.icon} />}
                {main.title}
            </Link>
        );
    }

    if (item && item.type === 'item') {
        itemTitle = item.title;

        ItemIcon = item.icon ? item.icon : AccountTreeTwoToneIcon;
        itemContent = (
            <Typography variant="subtitle1" className={classes.activeLink}>
                {icons && <ItemIcon className={classes.icon} />}
                {itemTitle}
            </Typography>
        );

        if (item.breadcrumbs !== false) {
            breadcrumbContent = (
                <Card className={cardClass} {...rest}>
                    <CardContent className={contentClass}>
                        <Grid
                            container
                            direction={rightAlign ? 'row' : 'column'}
                            justifyContent={rightAlign ? 'space-between' : 'flex-start'}
                            alignItems={rightAlign ? 'center' : 'flex-start'}
                            spacing={1}
                        >
                            {title && !titleBottom && (
                                <Grid item>
                                    <Typography variant="h3"> {item.title} </Typography>
                                </Grid>
                            )}
                            <Grid item>
                                <MuiBreadcrumbs aria-label="breadcrumb" maxItems={maxItems ? maxItems : 8} separator={separatorIcon}>
                                    <Link component={RouterLink} to="/" color="inherit" variant="subtitle1" className={classes.link}>
                                        {icons && <HomeTwoToneIcon className={classes.icon} />}
                                        {icon && <HomeIcon className={classes.icon} style={{marginRight: 0}} />}
                                        {!icon && 'Dashboard'}
                                    </Link>
                                    {mainContent}
                                    {itemContent}
                                </MuiBreadcrumbs>
                            </Grid>
                            {title && titleBottom && (
                                <Grid item>
                                    <Typography variant="h3"> {item.title} </Typography>
                                </Grid>
                            )}
                        </Grid>
                    </CardContent>
                    {card === false && divider !== false && <Divider className={classes.divider} />}
                </Card>
            );
        }

        // document.title = itemTitle + config.title;
    }

    return breadcrumbContent;
};

export default Breadcrumbs;
