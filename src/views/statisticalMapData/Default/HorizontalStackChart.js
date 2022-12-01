import Grid from '@mui/material/Grid';
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';

const data = [
    { name: '{"cnt":1001,"day":"월","date":"08/01"}', value: 1000 },
    { name: '{"cnt":1002,"day":"화","date":"08/02"}', value: 3000 },
    { name: '{"cnt":1003,"day":"수","date":"08/03"}', value: 2000 },
    { name: '{"cnt":1003,"day":"목","date":"08/05"}', value: 3500 },
    { name: '{"cnt":1003,"day":"금","date":"08/06"}', value: 800 },
    { name: '{"cnt":1003,"day":"토","date":"08/07"}', value: 2000 },
    { name: '{"cnt":1003,"day":"일","date":"08/08"}', value: 1000 }
];

const data2 = [
    { name: '{"cnt":1001,"day":"월","date":"08/09"}', value: 2000 },
    { name: '{"cnt":1002,"day":"화","date":"08/10"}', value: 1500 },
    { name: '{"cnt":1003,"day":"수","date":"08/11"}', value: 1300 },
    { name: '{"cnt":1003,"day":"목","date":"08/12"}', value: 2000 },
    { name: '{"cnt":1003,"day":"금","date":"08/13"}', value: 1000 },
    { name: '{"cnt":1003,"day":"토","date":"08/14"}', value: 3000 },
    { name: '{"cnt":1003,"day":"일","date":"08/15"}', value: 2000 }
];

const dayCheck = ['월', '화', '수', '목', '금', '토', '일'];
const CustomTick = (data) => {
    const pData = JSON.parse(data.payload.value);
    const xPosition = data.left === true ? -100 : 100;
    const bottomLeft = `${data.left === true ? pData.date : ''}    `;
    const bottomRight = `    ${data.left !== true ? pData.date : ''}`;
    const bottomText = `${dayCheck.includes(pData.day) ? pData.day : 'unKnown'}`;
    const plainText = bottomLeft + bottomText + bottomRight;
    return (
        <g transform={`translate(${data.x},${data.y})`}>
            <text x={0} dy={-20} fill="#666" textAnchor={data.left === true ? 'left' : 'end'}>
                <tspan x={xPosition} dy="-5" fontSize={10}>
                    {pData.cnt !== undefined && pData.cnt >= 0 ? pData.cnt : 0}
                </tspan>
                <tspan x={xPosition} dy="10" fontSize={10}>
                    {plainText}
                </tspan>
            </text>
        </g>
    );
};

const HorizontalStackChart = (props) => {
    return (
        <Grid container spacing={0} justifyContent="center">
            <Grid item xs="auto">
                <ResponsiveContainer width={250} height={200}>
                    <BarChart data={data} layout="vertical" barCategoryGap={1} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <XAxis hide axisLine={false} type="number" reversed={true} />
                        <YAxis
                            tick={<CustomTick left={true} />}
                            tickLine={false}
                            axisLine={false}
                            type="category"
                            width={150}
                            dataKey="name"
                            yAxisId={0}
                        />
                        <Bar dataKey="value" fill="#4682B4" />
                    </BarChart>
                </ResponsiveContainer>
            </Grid>
            <Grid item xs="auto">
                <ResponsiveContainer width={250} height={200}>
                    <BarChart data={data2} layout="vertical" barCategoryGap={1} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <XAxis hide axisLine={false} type="number" />
                        <YAxis
                            tick={<CustomTick />}
                            tickLine={false}
                            axisLine={false}
                            type="category"
                            width={150}
                            dataKey="name"
                            yAxisId={0}
                            orientation="right"
                        />
                        <Bar dataKey="value" fill="#00FF7F" />
                    </BarChart>
                </ResponsiveContainer>
            </Grid>
        </Grid>
    );
};

export default HorizontalStackChart;
