import { useEffect, React } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(props) {
    useEffect(() => {
        try {
            if (props.percent === undefined) {
                throw new Error('CircularProgress percent undefinde');
            } else if (props.title === undefined) {
                throw new Error('CircularProgress title undefinde');
            } else if (props.data === undefined) {
                throw new Error('CircularProgress title undefinde');
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <Box sx={{ position: 'relative', display: 'inline-flex', ml: 7 }}>
            <CircularProgress
                variant="determinate"
                sx={{
                    color: (theme) => theme.palette.grey[200]
                }}
                size={170}
                thickness={4}
                {...props}
                value={100}
            />
            <CircularProgress
                variant="determinate"
                sx={{
                    color: '#308fe8',
                    position: 'absolute',
                    left: 0
                }}
                size={170}
                thickness={4}
                {...props}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    flexDirection: 'column',
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Typography variant="caption" component="div" color="blue" fontSize={30}>
                    {props.percent ? `${Math.round(props.percent)}%` : ''}
                </Typography>
                <Typography variant="caption" color="black" fontSize={15}>
                    {props.data}
                </Typography>
                <Typography variant="caption">{props.title}</Typography>
            </Box>
        </Box>
    );
}

export default function CircularStatic(props) {
    return (
        <CircularProgressWithLabel
            value={props.percent < 100 ? props.percent : 100}
            percent={props.percent}
            title={props.title}
            data={props.data}
        />
    );
}
