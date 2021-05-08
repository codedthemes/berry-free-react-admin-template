import React from 'react';
import {Avatar, Card, CardContent, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Typography} from '@material-ui/core';

import StorefrontTwoToneIcon from '@material-ui/icons/StorefrontTwoTone';

const useStyles = makeStyles((theme) => ({
    content: {
        padding: '16px !important'
    },
    avatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        backgroundColor: theme.palette.warning.light,
        color: theme.palette.warning.dark
    },
    secondary: {
        color: theme.palette.grey[500],
        marginTop: '5px'
    },
    padding: {
        paddingTop: 0,
        paddingBottom: 0
    }
}));

const TotalIncomeCard = () => {
    const classes = useStyles();

    return (
        <Card>
            <CardContent className={classes.content}>
                <List className={classes.padding}>
                    <ListItem alignItems="center" disableGutters className={classes.padding}>
                        <ListItemAvatar>
                            <Avatar variant="rounded" className={classes.avatar}>
                                <StorefrontTwoToneIcon fontSize="inherit" />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            className={classes.padding}
                            primary={<Typography variant="h4">$203k</Typography>}
                            secondary={
                                <Typography variant="subtitle2" className={classes.secondary}>
                                    Total Income
                                </Typography>
                            }
                        />
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    );
};

export default TotalIncomeCard;
