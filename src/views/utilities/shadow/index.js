import React from 'react';
import {Box, Card, CardContent, CardHeader, Divider, Grid} from '@material-ui/core';

import SubCard from '../../../ui-component/cards/SubCard';
import {gridSpacing} from '../../../store/constant';

const ColorBox = (props) => {
    return (
        <React.Fragment>
            <Card sx={{mb: 3, boxShadow: props.shadow}}>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{py: 4.5, bgcolor: props.bgcolor, color: 'grey.900'}}>
                    <Box sx={{color: 'inherit'}}>boxShadow: {props.shadow}</Box>
                </Box>
            </Card>
        </React.Fragment>
    );
};

const UtilitisShadow = () => {
    return (
        <Card>
            <CardHeader title="Basic Shadow" />
            <Divider />
            <CardContent>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <SubCard title="Basic Shadow">
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="primary.light" shadow="0" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="primary.light" shadow="1" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="primary.light" shadow="2" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="primary.light" shadow="3" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="primary.light" shadow="4" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="primary.light" shadow="5" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="primary.light" shadow="6" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="primary.light" shadow="7" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="primary.light" shadow="8" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="primary.light" shadow="9" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="primary.light" shadow="10" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="primary.light" shadow="11" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="primary.light" shadow="12" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="primary.light" shadow="13" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="primary.light" shadow="14" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="primary.light" shadow="15" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="primary.light" shadow="16" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="primary.light" shadow="17" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="primary.light" shadow="18" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="primary.light" shadow="19" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="primary.light" shadow="20" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="primary.light" shadow="21" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="primary.light" shadow="22" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="primary.light" shadow="23" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="primary.light" shadow="24" />
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default UtilitisShadow;
