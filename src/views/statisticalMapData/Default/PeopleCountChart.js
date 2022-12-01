import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function PeopleCountChart(props) {
    return (
        <LineChart
            width={450}
            height={200}
            data={props.PeopleDummy}
            margin={{
                top: 5,
                right: 30,
                left: -12,
                bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            {/* <Legend /> */}
            <Line type="monotone" dataKey="lastWeek" name="지난주" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="thisWeek" name="이번주" stroke="#82ca9d" />
        </LineChart>
    );
}
