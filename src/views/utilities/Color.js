import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@material-ui/styles';
import { Box, Card, Grid, Typography } from '@material-ui/core';

// project imports
import SubCard from './../../ui-component/cards/SubCard';
import MainCard from './../../ui-component/cards/MainCard';
import SecondaryAction from './../../ui-component/cards/CardSecondaryAction';
import { gridSpacing } from './../../store/constant';

//===============================|| COLOR BOX ||===============================//

const ColorBox = ({ bgcolor, title, data, dark }) => {
    const theme = useTheme();
    return (
        <React.Fragment>
            <Card sx={{ mb: 3 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        py: 4.5,
                        bgcolor: bgcolor,
                        color: dark ? theme.palette.grey[800] : '#ffffff'
                    }}
                >
                    {title && (
                        <Typography variant="subtitle1" color="inherit">
                            {title}
                        </Typography>
                    )}
                    {!title && <Box sx={{ p: 1.15 }}></Box>}
                </Box>
            </Card>
            {data && (
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="subtitle2">{data.label}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" sx={{ textTransform: 'uppercase' }}>
                            {data.color}
                        </Typography>
                    </Grid>
                </Grid>
            )}
        </React.Fragment>
    );
};

ColorBox.propTypes = {
    bgcolor: PropTypes.string,
    title: PropTypes.string,
    data: PropTypes.object.isRequired,
    dark: PropTypes.bool
};

//===============================|| UI COLOR ||===============================//

const UIColor = () => {
    const theme = useTheme();

    return (
        <MainCard title="Color Palette" secondary={<SecondaryAction link="https://next.material-ui.com/system/palette/" />}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <SubCard title="Primary Color">
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.primary.light}
                                    data={{ label: 'Shade-50', color: theme.palette.primary.light }}
                                    title="primary.light"
                                    dark
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.primary[200]}
                                    data={{ label: 'Shade-200', color: theme.palette.primary[200] }}
                                    title="primary[200]"
                                    dark
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.primary.main}
                                    data={{ label: 'Shade-500', color: theme.palette.primary.main }}
                                    title="primary.main"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.primary.dark}
                                    data={{ label: 'Shade-600', color: theme.palette.primary.dark }}
                                    title="primary.dark"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.primary[800]}
                                    data={{ label: 'Shade-800', color: theme.palette.primary[800] }}
                                    title="primary[800]"
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12}>
                    <SubCard title="Secondary Color">
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.secondary.light}
                                    data={{ label: 'Shade-50', color: theme.palette.secondary.light }}
                                    title="secondary.light"
                                    dark
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.secondary[200]}
                                    data={{ label: 'Shade-200', color: theme.palette.secondary[200] }}
                                    title="secondary[200]"
                                    dark
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.secondary.main}
                                    data={{ label: 'Shade-500', color: theme.palette.secondary.main }}
                                    title="secondary.main"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.secondary.dark}
                                    data={{ label: 'Shade-600', color: theme.palette.secondary.dark }}
                                    title="secondary.dark"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.secondary[800]}
                                    data={{ label: 'Shade-800', color: theme.palette.secondary[800] }}
                                    title="secondary[800]"
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12}>
                    <SubCard title="Success Color">
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.success.light}
                                    data={{ label: 'Shade-100', color: theme.palette.success.light }}
                                    title="success.light"
                                    dark
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.success[200]}
                                    data={{ label: 'Shade-200', color: theme.palette.success[200] }}
                                    title="success[200]"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.success.main}
                                    data={{ label: 'Shade-400', color: theme.palette.success.main }}
                                    title="success.main"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.success.dark}
                                    data={{ label: 'Shade-700', color: theme.palette.success.dark }}
                                    title="success.dark"
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12}>
                    <SubCard title="Orange Color">
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.orange.light}
                                    data={{ label: 'Shade-50', color: theme.palette.orange.light }}
                                    title="orange.light"
                                    dark
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.orange.main}
                                    data={{ label: 'Shade-200', color: theme.palette.orange.main }}
                                    title="orange.main"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.orange.dark}
                                    data={{ label: 'Shade-800', color: theme.palette.orange.dark }}
                                    title="orange.dark"
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12}>
                    <SubCard title="Error Color">
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.error.light}
                                    data={{ label: 'Shade-50', color: theme.palette.error.light }}
                                    title="error.light"
                                    dark
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.error.main}
                                    data={{ label: 'Shade-200', color: theme.palette.error.main }}
                                    title="error.main"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.error.dark}
                                    data={{ label: 'Shade-800', color: theme.palette.error.dark }}
                                    title="error.dark"
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12}>
                    <SubCard title="Warning Color">
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.warning.light}
                                    data={{ label: 'Shade-50', color: theme.palette.warning.light }}
                                    title="warning.light"
                                    dark
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.warning.main}
                                    data={{ label: 'Shade-100', color: theme.palette.warning.main }}
                                    title="warning.main"
                                    dark
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.warning.dark}
                                    data={{ label: 'Shade-500', color: theme.palette.warning.dark }}
                                    title="warning.dark"
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12}>
                    <SubCard title="Grey Color">
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.grey[50]}
                                    data={{ label: 'Shade-50', color: theme.palette.grey[50] }}
                                    title="grey[50]"
                                    dark
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.grey[100]}
                                    data={{ label: 'Shade-100', color: theme.palette.grey[100] }}
                                    title="grey[100]"
                                    dark
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.grey[200]}
                                    data={{ label: 'Shade-200', color: theme.palette.grey[200] }}
                                    title="grey[200]"
                                    dark
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.grey[300]}
                                    data={{ label: 'Shade-300', color: theme.palette.grey[300] }}
                                    title="grey[300]"
                                    dark
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.grey[500]}
                                    data={{ label: 'Shade-500', color: theme.palette.grey[500] }}
                                    title="grey[500]"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.grey[600]}
                                    data={{ label: 'Shade-600', color: theme.palette.grey[600] }}
                                    title="grey[600]"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.grey[700]}
                                    data={{ label: 'Shade-700', color: theme.palette.grey[700] }}
                                    title="grey[700]"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox
                                    bgcolor={theme.palette.grey[900]}
                                    data={{ label: 'Shade-900', color: theme.palette.grey[900] }}
                                    title="grey[900]"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <ColorBox bgcolor="#fff" data={{ label: 'Pure White', color: '#ffffff' }} title="Pure White" dark />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default UIColor;
