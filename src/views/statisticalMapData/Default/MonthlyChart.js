import React from 'react';
import { BarChart, Bar } from 'recharts';

export default function MonthlyChart(props) {
    return (
        <>
            <BarChart width={150} height={60} data={props.data}>
                <Bar dataKey={props.dataKey} fill="#8884d8" />
            </BarChart>
        </>
    );
}
