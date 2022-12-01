import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DatePicker from 'ui-component/commonComponent/DatePicker';
import PeopleCountChart from './PeopleCountChart';
import ProgressBar from 'ui-component/commonComponent/ProgressBar';
import HorizontalStackChart from './HorizontalStackChart';
import MonthlyChart from './MonthlyChart';
import CloseIcon from '@mui/icons-material/Close';
import Day from 'db/day.json';

export default function MapDrawer(props) {
    const [date, setDate] = React.useState();
    const [month, setMonth] = React.useState();
    const [year, setYear] = React.useState();
    const [monthVisit, setMonthVisit] = React.useState();
    const [yearVisit, setYearVisit] = React.useState();
    const [chartMonthData, setMonthChartData] = React.useState();
    const [chartYearData, setYearChartData] = React.useState();
    const [timeVisit, setTimeVisit] = React.useState();
    const [stayTime, setStayTime] = React.useState();
    const [revisit, setRevisit] = React.useState();
    const onClick = () => {
        setMonth(date.getMonth() + 1);
        setYear(date.getFullYear());
        setMonthVisit(props.Dummy[props.id].visit);
        setYearVisit(props.Dummy[props.id].visit);
        setMonthChartData(props.LastMonth);
        setYearChartData(props.LastYear);
        setTimeVisit(props.PeopleDummy);
        setStayTime(props.Dummy[props.id].stay);
        setRevisit(props.Dummy[props.id].revisit);
    };

    function clearState() {
        return (
            setMonth(undefined),
            setYear(undefined),
            setMonthVisit(undefined),
            setYearVisit(undefined),
            setMonthChartData(undefined),
            setYearChartData(undefined),
            setTimeVisit(undefined),
            setStayTime(undefined),
            setRevisit(undefined)
        );
    }

    const anchor = 'right';
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        props.setState({ ...props.state, [anchor]: open });
        clearState();
        console.log('닫힘');
    };

    React.useEffect(() => {
        try {
            toggleDrawer(anchor, props.state[anchor]);
            if (props.value === undefined) {
                throw new Error('MapDrawer value undefined');
            } else if (props.PeopleDummy === undefined) {
                throw new Error('MapDrawer PeopleDummy undefined');
            }
        } catch (error) {
            console.log(error);
        }
    }, [props.state]);

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 510 }}
            role="presentation"
            /* onClick={toggleDrawer(anchor, true)} */
            /* onKeyDown={toggleDrawer(anchor, false)} */
        >
            <Grid container spacing={2} columns={12} sx={{ pt: 2, pl: 5 }}>
                <Grid item xs={10}>
                    <Typography sx={{ fontSize: 30 }}>{props.value}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={toggleDrawer(anchor, false)}>
                        <CloseIcon fontSize="small" />
                    </Button>
                </Grid>
            </Grid>

            <Divider variant="middle" sx={{ borderColor: '#1E90FF' }} />

            <Grid sx={{ pt: 2, pl: 3 }}>
                <Typography sx={{ fontSize: 15 }}>날짜</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <DatePicker setDate={setDate} />
                    </Grid>
                    <Grid item xs={4} sx={{ mt: 1 }}>
                        {date ? (
                            <Button onClick={onClick} variant="contained" disableElevation>
                                적용하기
                            </Button>
                        ) : (
                            <Button variant="contained" disabled>
                                적용하기
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Grid>

            <Grid sx={{ pt: 2, pl: 3 }}>
                <Typography sx={{ fontSize: 15 }}>시간별 방문자수</Typography>
                <Grid>
                    <PeopleCountChart PeopleDummy={timeVisit} />
                </Grid>
            </Grid>

            <Grid sx={{ pt: 2, pl: 1 }}>
                <Typography sx={{ fontSize: 15, pl: 2 }}>방문현황</Typography>
                <Grid container>
                    <Grid item xs={2} sx={{ pt: 2 }}>
                        <Typography sx={{ fontSize: 13, textAlign: 'center' }}>방문자</Typography>
                    </Grid>
                    <Grid item xs={9} sx={{ pl: 2 }}>
                        {monthVisit !== undefined ? (
                            <ProgressBar visitData={monthVisit} data={'명'} />
                        ) : (
                            <ProgressBar visitData={0} data={'명'} />
                        )}
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={2} sx={{ pt: 2 }}>
                        <Typography sx={{ fontSize: 13, textAlign: 'center' }}>평균 체류시간</Typography>
                    </Grid>
                    <Grid item xs={9} sx={{ pl: 2 }}>
                        {stayTime !== undefined ? (
                            <ProgressBar visitData={stayTime} data={'분'} />
                        ) : (
                            <ProgressBar visitData={0} data={'분'} />
                        )}
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={2} sx={{ pt: 2 }}>
                        <Typography sx={{ fontSize: 13, textAlign: 'center' }}>재방문자</Typography>
                    </Grid>
                    <Grid item xs={9} sx={{ pl: 2 }}>
                        {revisit !== undefined ? (
                            <ProgressBar visitData={revisit} data={'명'} />
                        ) : (
                            <ProgressBar visitData={0} data={'명'} />
                        )}
                    </Grid>
                </Grid>
            </Grid>

            <Grid sx={{ pt: 2 }}>
                <Typography sx={{ fontSize: 15, pl: 3.5, pb: 1 }}>방문추이</Typography>
                <Grid>
                    <HorizontalStackChart Day={Day} />
                </Grid>
            </Grid>

            <Grid container columns={16} sx={{ pl: 3, pt: 2 }}>
                <Grid item xs={8}>
                    <Typography sx={{ fontSize: 15 }}>월별 방문자수</Typography>
                    <Grid sx={{ border: '1px solid #A9A9A9', width: '20vh', height: '14vh' }}>
                        <Grid sx={{ height: '4vh' }}>
                            {props.Dummy[props.id] ? (
                                <Typography sx={{ fontSize: 20, fontWeight: 'bold', pt: 0.5, pl: 5 }}>{monthVisit}</Typography>
                            ) : (
                                ''
                            )}
                        </Grid>
                        <Grid sx={{ height: '4vh' }}>
                            {month ? <Typography sx={{ fontSize: 12, pl: 5 }}>{month}월 방문자</Typography> : ''}
                        </Grid>
                        <MonthlyChart data={chartMonthData} dataKey="visit" />
                    </Grid>
                </Grid>
                <Grid item xs={8}>
                    <Typography sx={{ fontSize: 15 }}>연별 방문자수</Typography>
                    <Grid sx={{ border: '1px solid #A9A9A9', width: '20vh', height: '14vh' }}>
                        <Grid sx={{ height: '4vh' }}>
                            {props.Dummy[props.id] ? (
                                <Typography sx={{ fontSize: 20, fontWeight: 'bold', pt: 0.5, pl: 5 }}>{yearVisit}</Typography>
                            ) : (
                                ''
                            )}
                        </Grid>
                        <Grid sx={{ height: '4vh' }}>
                            {year ? <Typography sx={{ fontSize: 12, pl: 5 }}>{year}년 방문자</Typography> : ''}
                        </Grid>
                        <MonthlyChart data={chartYearData} dataKey="visit" />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );

    return (
        <div>
            <React.Fragment key={anchor}>
                <Drawer anchor={anchor} open={props.state[anchor]} onClose={toggleDrawer(anchor, false)}>
                    {list(anchor)}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
