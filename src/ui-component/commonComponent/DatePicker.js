import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default function MaterialUIPickers(props) {
    const [value, setValue] = React.useState(null);
    //선택한 날짜의 월만 출력

    const handleChange = (newValue) => {
        setValue(newValue);
        props.setDate(newValue);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
                <DesktopDatePicker
                    /* label="Date desktop" */
                    inputFormat="yyyy.MM.dd"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Stack>
        </LocalizationProvider>
    );
}
