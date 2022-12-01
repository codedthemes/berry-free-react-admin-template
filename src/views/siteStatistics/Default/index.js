import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import DailyCard from './DailyCard';
import MonthlyCard from './MonthlyCard';
import YearlyCard from './YearlyCard';
import VisitStatus from './visitStatus';
import { gridSpacing } from 'store/constant';

// db data
import Dummy from 'db/data.json';
import LastMonthDummy from 'db/lastMonth';
import LastYearDummy from 'db/lastYear';
import ThisYearDummy from 'db/thisYear';
import DayWeekDummy from 'db/dayWeek.json';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const SiteStatistics = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    /* 오늘 날짜 */
    const today = new Date();
    /* 오늘로부터 일주일 전 */
    const lastWeek = new Date(new Date().setDate(today.getDate() - 7));
    /* 오늘로부터 한달 전 */
    const oneMonthAgo = new Date(new Date().setMonth(today.getMonth() - 1));
    /* 오늘로부터 일년 전 */
    const oneYearAgo = new Date(new Date().setFullYear(today.getFullYear() - 1));
    /* 오늘 방문자 */
    const todayVisitSum = Dummy.map((dummy) => {
        return dummy.visit;
    });
    const todayVisitSumResult = todayVisitSum.reduce((acc, cur) => {
        return acc + cur;
    }, 0);
    /*  이번달 방문자 총합 */
    const visitSum = Dummy.map((dummy) => {
        return dummy.visit;
    });
    const visitSumResult = visitSum.reduce((acc, cur) => {
        return acc + cur;
    }, 0);
    /* 저번달 방문자 합계 */
    const lastMonthVisit = LastMonthDummy.map((dummy) => {
        return dummy.visit;
    });
    const lastMonthVisitResult = lastMonthVisit.reduce((acc, cur) => {
        return acc + cur;
    }, 0);
    /* 저번달 1일부터 14일까지 합계 */
    var fortNightResult = 0;
    for (var i = 0; i < 15; i++) {
        fortNightResult = fortNightResult + LastMonthDummy[i].visit;
    }
    /* 작년 1월부터 6월까지 방문자 합계 */
    var halfYear = 0;
    for (var i = 0; i < 7; i++) {
        halfYear = halfYear + LastYearDummy[i].visit;
    }
    /* 작년 전체 방문자 */
    const lastYearVisit = LastYearDummy.map((dummy) => {
        return dummy.visit;
    });
    const lastYearVisitResult = lastYearVisit.reduce((acc, cur) => {
        return acc + cur;
    }, 0);
    /* 올해 전체 방문자 */
    const thisYearVisit = ThisYearDummy.map((dummy) => {
        return dummy.visit;
    });
    const thisYearVisitResult = thisYearVisit.reduce((acc, cur) => {
        return acc + cur;
    }, 0);
    /* 평균 체류 시간 */
    const stayAvgsum = Dummy.map((dummy) => {
        return dummy.stay;
    });
    const stayAvgSumResult = stayAvgsum.reduce((acc, cur) => {
        return acc + cur;
    }, 0);
    const avg = Math.round(stayAvgSumResult / stayAvgsum.length);
    /* 오늘 재방문자 */
    const revisitSum = Dummy.map((dummy) => {
        return dummy.revisit;
    });
    const revisitSumResult = revisitSum.reduce((acc, cur) => {
        return acc + cur;
    }, 0);
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={12}>
                        <VisitStatus todayVisitSumResult={todayVisitSumResult} avg={avg} revisitSumResult={revisitSumResult} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={7} md={12} sm={12} xs={12}>
                        <DailyCard today={today} lastWeek={lastWeek} DayWeekDummy={DayWeekDummy} />
                    </Grid>
                    <Grid item lg={5} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={12} xs={12} md={12} lg={12}>
                                <MonthlyCard
                                    today={today}
                                    visitSumResult={visitSumResult}
                                    oneMonthAgo={oneMonthAgo}
                                    fortNightResult={fortNightResult}
                                    lastMonthVisitResult={lastMonthVisitResult}
                                />
                            </Grid>
                            <Grid item sm={12} xs={12} md={12} lg={12}>
                                <YearlyCard
                                    today={today}
                                    oneYearAgo={oneYearAgo}
                                    oneMonthAgo={oneMonthAgo}
                                    halfYear={halfYear}
                                    lastYearVisitResult={lastYearVisitResult}
                                    thisYearVisitResult={thisYearVisitResult}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default SiteStatistics;
