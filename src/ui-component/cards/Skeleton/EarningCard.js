import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Skeleton } from '@material-ui/core';

// style constant
const useStyles = makeStyles({
    cardHeading: {
        marginRight: '8px',
        marginTop: '18px',
        marginBottom: '14px'
    }
});

// ===========================|| SKELETON EARNING CARD ||=========================== //

const EarningCard = () => {
    const classes = useStyles();
    return (
        <Card>
            <CardContent>
                <Grid container direction="column">
                    <Grid item>
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Skeleton variant="rect" width={44} height={44} />
                            </Grid>
                            <Grid item>
                                <Skeleton variant="rect" width={34} height={34} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Skeleton variant="rect" className={classes.cardHeading} height={40} />
                    </Grid>
                    <Grid item>
                        <Skeleton variant="rect" height={30} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default EarningCard;
