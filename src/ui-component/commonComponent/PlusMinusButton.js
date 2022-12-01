import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const buttons = [
    <Button key="one" sx={{ backgroundColor: '#E3F2FD', color: 'black', borderColor: 'black' }}>
        <Typography sx={{ fontSize: 20 }}> + </Typography>
    </Button>,
    <Button key="two" sx={{ backgroundColor: '#E3F2FD', color: 'black', borderColor: 'black' }}>
        <Typography sx={{ fontSize: 20 }}> - </Typography>
    </Button>
];

export default function PlusMinusButton() {
    return (
        <Box
            sx={{
                display: 'flex',
                '& > *': {
                    m: 1
                }
            }}
        >
            <ButtonGroup orientation="vertical" aria-label="vertical outlined button group">
                {buttons}
            </ButtonGroup>
        </Box>
    );
}
