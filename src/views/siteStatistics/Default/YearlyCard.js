import PropTypes from 'prop-types';

// material-ui
import { Grid, Typography, Divider } from '@mui/material';
import PieChartSharpIcon from '@mui/icons-material/PieChartSharp';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import CircleChart from 'ui-component/commonComponent/CircleChart';

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const YearlyCard = (props) => {
    const color = {
        firstColor: {
            color: 'rgb(54, 162, 235)'
        },
        secondColor: {
            color: 'rgba(147, 154, 169)'
        },
        thirdColor: {
            color: 'rgba(0, 45, 168, 1)'
        }
    };
    return (
        <>
            <MainCard>
                <Grid>
                    <Typography sx={{ fontSize: '1.6rem', mb: 1 }}>연도별추세</Typography>
                    <Divider sx={{ mb: 2 }} />
                </Grid>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container direction="row" alignItems="center" justifyContent="space-between">
                            <Grid item xs={6} sm={4} md={5} lg={5}>
                                <CircleChart
                                    firstData={props.halfYear}
                                    secondData={props.lastYearVisitResult}
                                    thirdData={props.thisYearVisitResult}
                                    color={color}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={7}>
                                <Typography fontSize={17} fontWeight={'bold'} sx={{ pb: 1 }}>
                                    {props.oneYearAgo.getFullYear()}년 대비
                                    {props.today.getFullYear()}년
                                </Typography>
                                <Grid container>
                                    <Grid item xs={9}>
                                        <Typography fontSize={13} sx={{ pb: 1 }}>
                                            <PieChartSharpIcon fontSize="10" sx={{ color: color.firstColor, mr: 2 }} />
                                            작년1월부터 6월까지
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography fontSize={13}>
                                            {props.halfYear.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}명
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={9}>
                                        <Typography fontSize={12} sx={{ pb: 1 }}>
                                            <PieChartSharpIcon fontSize="10" sx={{ color: color.secondColor, mr: 2 }} />
                                            지난해 합계
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography fontSize={13}>
                                            {props.lastYearVisitResult.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}명
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={9}>
                                        <Typography fontSize={13} sx={{ pb: 1 }}>
                                            <PieChartSharpIcon fontSize="10" sx={{ color: color.thirdColor, mr: 2 }} />
                                            올해 전체
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography fontSize={13}>
                                            {props.thisYearVisitResult.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}명
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
};

YearlyCard.propTypes = {
    isLoading: PropTypes.bool
};

export default YearlyCard;
