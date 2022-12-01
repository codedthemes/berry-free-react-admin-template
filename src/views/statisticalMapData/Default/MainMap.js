import PropTypes from 'prop-types';
import { useState, useEffect, React } from 'react';

// material-ui
import { Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import PlusMinusButton from 'ui-component/commonComponent/PlusMinusButton';
import MapSizeButton from 'ui-component/commonComponent/MapSizeButton';
import AreaNameButton from 'ui-component/commonComponent/AreaNameButton';
import MapButton from './MapButton';
import MapDrawer from './MapDrawer';

// chart data
import DayWeek from 'db/dayWeek.json';
import PeopleDummy from 'db/peopleCount.json';
import LastMonth from 'db/lastMonth.json';
import LastYear from 'db/lastYear.json';
import DummyData from 'db/data.json';

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const MainMap = ({ isLoading }) => {
    const [id, setId] = useState(0);
    const [value, setValue] = useState();
    const [state, setState] = useState({
        right: false
    });

    useEffect(() => {
        console.log('이펙트');
    }, [id, value, state]);

    return (
        <>
            {isLoading ? (
                ''
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container direction="column" alignItems="flex-start" justifyContent="flex-start" spacing={2}>
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item xs={12} sm={6} md={4} lg={2}>
                                            <PlusMinusButton />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item xs={12} sm={6} md={4} lg={2}>
                                            <MapSizeButton />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item xs={12} sm={6} md={4} lg={2}>
                                            <AreaNameButton />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item xs={12} sm={6} md={4} lg={2}>
                                            <MapButton setValue={setValue} state={state} setState={setState} setId={setId} />
                                            <MapDrawer
                                                id={id}
                                                state={state}
                                                setState={setState}
                                                value={value}
                                                Dummy={DummyData}
                                                DayWeek={DayWeek}
                                                PeopleDummy={PeopleDummy}
                                                LastMonth={LastMonth}
                                                LastYear={LastYear}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

MainMap.propTypes = {
    isLoading: PropTypes.bool
};

export default MainMap;
