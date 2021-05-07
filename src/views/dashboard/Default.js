import React from 'react';
import {Grid} from '@material-ui/core';

import {gridSpacing} from '../../store/constant';
import EarningCard from '../../ui-component/cards/EarningCard';
import TotalChartCard from '../../ui-component/cards/TotalChartCard';
import TotalIncomePatternCard from '../../ui-component/cards/TotalIncomePatternCard';
import TotalIncomeCard from '../../ui-component/cards/TotalIncomeCard';
import ChartCard from '../../ui-component/cards/ChartCard';
import PopularCard from '../../ui-component/cards/PopularCard';

const Dashboard = () => {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalChartCard />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomePatternCard />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeCard />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} sm={12} md={8}>
                        <ChartCard />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <PopularCard />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
