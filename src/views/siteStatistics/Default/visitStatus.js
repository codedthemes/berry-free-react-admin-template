import PropTypes from 'prop-types';
import { useEffect } from 'react';

// material-ui
import { Grid, Typography, Divider } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import CircularProgress from '../../../ui-component/commonComponent/CircularProgress';

const VisitStatus = (props) => {
    useEffect(() => {
        console.log('visitStatus');
    }, []);

    return (
        <>
            <MainCard>
                <Grid>
                    <Typography sx={{ fontSize: '1.6rem', mb: 1 }}>방문현황</Typography>
                    <Divider sx={{ mb: 2 }} />
                </Grid>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container direction="row" alignItems="center" justifyContent="space-between">
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <CircularProgress
                                    percent={104}
                                    title={'1시간 이내 방문자'}
                                    data={props.todayVisitSumResult.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <CircularProgress
                                    percent={6}
                                    title={'오늘 방문자'}
                                    data={props.todayVisitSumResult.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <CircularProgress
                                    percent={50}
                                    title={'오늘 평균 체류시간'}
                                    data={props.avg <= 59 ? props.avg + '분' : parseInt(props.avg / 60) + '시간' + (props.avg % 60) + '분'}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <CircularProgress
                                    percent={8}
                                    title={'오늘 재방문자'}
                                    data={props.revisitSumResult.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
};

VisitStatus.propTypes = {
    isLoading: PropTypes.bool
};

export default VisitStatus;
