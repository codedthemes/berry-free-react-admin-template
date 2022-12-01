import * as React from 'react';
import Button from '@mui/material/Button';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

export default function MapSizeButton() {
    return (
        <Button style={{ width: '8vw', fontSize: 13 }} sx={{ background: '#E3F2FD', color: 'black' }}>
            <GpsFixedIcon fontSize="small" sx={{ pr: 1 }} />
            기본 지도 크기
        </Button>
    );
}
