import React, { useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
    return (
        <Box>
            <Box>
                <Typography sx={{ textAlign: 'right' }}>
                    {`${Math.round(props.valueNum)}`}
                    {props.data}
                </Typography>
            </Box>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
        </Box>
    );
}

export default function ProgressBar(props) {
    useEffect(() => {
        try {
            if (props.visitData === undefined) {
                throw new Error('ProgressBar visitData undefined');
            } else if (props.data === undefined) {
                throw new Error('ProgressBar data undefined');
            }
        } catch (error) {
            //멈춤, 새로고침
            console.log(error);
        }
        /* return () => {
          console.log('값 넘겨주기 완료');
        }; */
    }, []);
    return (
        <Box sx={{ width: '90%' }}>
            <LinearProgressWithLabel value={(props.visitData / 1000) * 100} valueNum={props.visitData} data={props.data} />
        </Box>
    );
}
