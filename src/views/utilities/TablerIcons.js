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

//=============================|| TABLER ICONS ||=============================//

const TablerIcons = () => {
    const classes = useStyles();

    return (
        <MainCard title="Tabler Icons" secondary={<SecondaryAction link="https://tablericons.com/" />}>
            <Card sx={{ overflow: 'hidden' }}>
                <iframe title="Tabler Icons" className={classes.frame} width="100%" src="https://tablericons.com/" />
            </Card>
        </MainCard>
    );
};

export default TablerIcons;
