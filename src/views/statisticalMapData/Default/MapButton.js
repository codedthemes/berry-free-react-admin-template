import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import MapIcon from '@mui/icons-material/Map';
import DummyData from 'db/data.json';

const ITEM_HEIGHT = 48;

export default function MapButton(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [color, setColor] = React.useState('#E3F2FD');
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setColor('#0959a8');
    };

    const handleClose = (event) => {
        setAnchorEl(null);
        props.setId(event.target.id);
        props.setValue(event.target.innerText);
        props.setState({ ...props.state, ['right']: event.target.id ? true : false });
        setColor('#E3F2FD');
    };

    return (
        <>
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                style={{ backgroundColor: color, width: '8vw', fontSize: 13, color: 'black' }}
                onClick={handleClick}
            >
                <MapIcon />
                지역선택
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button'
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '8vw'
                    }
                }}
            >
                {DummyData.map((maps, i) => (
                    <MenuItem key={i} id={i} onClick={handleClose}>
                        {maps.name}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
