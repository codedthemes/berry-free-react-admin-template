import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid2';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';

import { gridSpacing } from 'store/constant';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid container size={{ lg: 8, xs: 12 }} spacing={gridSpacing}>
                <Grid size={{ sm: 6, xs: 12 }}>
                    <EarningCard isLoading={isLoading} />
                </Grid>
                <Grid size={{ sm: 6, xs: 12 }}>
                    <TotalOrderLineChartCard isLoading={isLoading} />
                </Grid>
            </Grid>
            <Grid container spacing={gridSpacing} size={{ lg: 4, xs: 12 }}>
                <Grid size={{ lg: 12, sm: 6, xs: 12 }}>
                    <TotalIncomeDarkCard isLoading={isLoading} />
                </Grid>
                <Grid size={{ lg: 12, sm: 6, xs: 12 }}>
                    <TotalIncomeLightCard
                        {...{
                            isLoading: isLoading,
                            total: 203,
                            label: 'Total Income',
                            icon: <StorefrontTwoToneIcon fontSize="inherit" />
                        }}
                    />
                </Grid>
            </Grid>
            <Grid size={{ md: 8, xs: 12 }}>
                <TotalGrowthBarChart isLoading={isLoading} />
            </Grid>
            <Grid size={{ md: 4, xs: 12 }}>
                <PopularCard isLoading={isLoading} />
            </Grid>
        </Grid>
    );
};

export default Dashboard;
