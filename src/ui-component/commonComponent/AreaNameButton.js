import * as React from 'react';
import Button from '@mui/material/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export default function AreaNameButton() {
    const [color, setColor] = React.useState('#E3F2FD');
    const onClick = () => {
        color === '#E3F2FD' ? setColor('#0959a8') : setColor('#E3F2FD');
    };

    return (
        <Button onClick={onClick} style={{ backgroundColor: color, width: '8vw', fontSize: 13, color: 'black' }}>
            <RemoveRedEyeIcon fontSize="small" sx={{ pr: 1 }} />
            {color === '#E3F2FD' ? '지명 표시' : '지명 표시 숨기기'}
        </Button>
    );
}
