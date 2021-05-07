import React from 'react';
import {Box, Card, CardContent, CardHeader, Divider, Grid, Typography} from '@material-ui/core';

import SubCard from '../../../ui-component/cards/SubCard';
import {gridSpacing} from '../../../store/constant';

const ColorBox = (props) => {
    return (
        <React.Fragment>
            <Card sx={{mb: 3}}>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{py: 4.5, bgcolor: props.bgcolor, color: '#ffffff'}}>
                    {props.title && (
                        <Typography variant="subtitle1" color="inherit">
                            {props.title}
                        </Typography>
                    )}
                    {!props.title && <Box sx={{p: 1.15}}></Box>}
                </Box>
            </Card>
            {props.data && (
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="subtitle2">{props.data.label}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" sx={{textTransform: 'uppercase'}}>
                            {props.data.color}
                        </Typography>
                    </Grid>
                </Grid>
            )}
        </React.Fragment>
    );
};

const UIColor = () => {
    return (
        <Card>
            <CardHeader title="Color Palette" />
            <Divider />
            <CardContent>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <SubCard title="Primary Color">
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="primary.light" data={{label: 'Blue-50', color: '#E3F2FD'}} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="primary.200" data={{label: 'Blue-200', color: '#90CAF9'}} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="primary.main" data={{label: 'Blue-500', color: '#2196F3'}} title="primary.main" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="primary.dark" data={{label: 'Blue-600', color: '#1E88E5'}} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="primary.800" data={{label: 'Blue-800', color: '#1565C0'}} />
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12}>
                        <SubCard title="Secondary Color">
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="secondary.light" data={{label: 'DeepPurple-50', color: '#ede7f6'}} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="secondary.200" data={{label: 'DeepPurple-200', color: '#b39ddb'}} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox
                                        bgcolor="secondary.main"
                                        data={{label: 'DeepPurple-500', color: '#673ab7'}}
                                        title="secondary.main"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="secondary.dark" data={{label: 'DeepPurple-600', color: '#5e35b1'}} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="secondary.800" data={{label: 'DeepPurple-800', color: '#4527a0'}} />
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12}>
                        <SubCard title="Success Color">
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="success.light" data={{label: 'Green-A100', color: '#b9f6ca'}} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="success.main" data={{label: 'Green-A500', color: '#69f0ae'}} title="success.main" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="success.dark" data={{label: 'Green-A600', color: '#00c853'}} />
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12}>
                        <SubCard title="Orange Color">
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="orange.light" data={{label: 'DeepOrange-50', color: '#fbe9e7'}} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox
                                        bgcolor="orange.main"
                                        data={{label: 'DeepOrange-200', color: '#ffab91'}}
                                        title="orange.main"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="orange.dark" data={{label: 'DeepOrange-800', color: '#d84315'}} />
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12}>
                        <SubCard title="Error Color">
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="error.light" data={{label: 'Red-50', color: '#ef9a9a'}} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="error.main" data={{label: 'Red-200', color: '#f44336'}} title="error.main" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="error.dark" data={{label: 'Red-800', color: '#c62828'}} />
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12}>
                        <SubCard title="Warning Color">
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="warning.light" data={{label: 'Amber-50', color: '#b9f6ca'}} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="warning.main" data={{label: 'Amber-100', color: '#ffe57f'}} title="warning.main" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="warning.dark" data={{label: 'Amber-500', color: '#FFC107'}} />
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12}>
                        <SubCard title="Grey Color">
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="grey.50" data={{label: 'Grey-50', color: '#fafafa'}} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="grey.100" data={{label: 'Grey-100', color: '#f5f5f5'}} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="grey.200" data={{label: 'Grey-200', color: '#eeeeee'}} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="grey.300" data={{label: 'Grey-300', color: '#e0e0e0'}} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="grey.500" data={{label: 'Grey-500', color: '#9e9e9e'}} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="grey.600" data={{label: 'Grey-600', color: '#757575'}} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="grey.700" data={{label: 'Grey-700', color: '#616161'}} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="grey.900" data={{label: 'Grey-900', color: '#212121'}} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <ColorBox bgcolor="#fff" data={{label: 'Pure White', color: '#ffffff'}} />
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default UIColor;
