import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Card } from '@material-ui/core';

// project imports
import MainCard from './../../ui-component/cards/MainCard';
import SecondaryAction from './../../ui-component/cards/CardSecondaryAction';

// style constant
const useStyles = makeStyles((theme) => ({
    frame: {
        height: 'calc(100vh - 210px)',
        border: '1px solid',
        borderColor: theme.palette.primary.light
    }
}));

//============================|| MATERIAL ICONS ||============================//

const MaterialIcons = () => {
    const classes = useStyles();

    return (
        <MainCard title="Material Icons" secondary={<SecondaryAction link="https://material-ui.com/components/material-icons/" />}>
            <Card sx={{ overflow: 'hidden' }}>
                <iframe
                    title="Material Icon"
                    className={classes.frame}
                    width="100%"
                    src="https://material-ui.com/components/material-icons/"
                />
            </Card>
        </MainCard>
    );
};

export default MaterialIcons;
