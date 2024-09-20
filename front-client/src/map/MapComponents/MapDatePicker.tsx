import React, {useEffect, useRef, useState, useMemo, useCallback} from 'react';
import './Map.css';
import TextField from '@mui/material/TextField';
import DateTimePicker from '@mui/lab/DateTimePicker';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import Stack from '@mui/material/Stack';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';

/**CSS *******************************************/
/**CSS *******************************************/

const [dateValue, setDateValue] = useState<Date | null>(new Date('2022-03-26'))

const handleCalenderChange = (event: Date | null) => {
    setDateValue(event);
}

const MapDatePicker = () => {
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                    <DesktopDateTimePicker
                        label="date"
                        format="yyyy/MM/dd"
                        defaultValue={dateValue}
                        minDate={new Date('2020-01-01')}
                        onChange={(newDateValue) => {setDateValue(newDateValue);}}
                        slots={{
                            textField: props => <TextField {...props} />
                        }}

                        // When Version is: "@mui/lab": "^5.0.0-alpha.65"
                        // mask="____/__/__"
                        // inputFormat="yyyy/MM/dd"
                        // label="date"
                        // value={dateValue}
                        // minDate={new Date('2020-01-01')}
                        // onChange={(newDateValue) => {setDateValue(newDateValue);}}
                        // renderInput={props => <TextField {...props} />}
                    />
                </Stack>
            </LocalizationProvider>
        </div>
    );
}

/* newDateValueってどこから来た???*/

/*
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                    <DesktopDateTimePicker
                        mask="____/__/__"
                        inputFormat="yyyy/MM/dd"
                        label="date"
                        value={dateValue}
                        minDate={new Date('2020-01-01')}
                        onChange={(newDateValue) => {setDateValue(newDateValue);}}
                        renderInput={props => <TextField {...props} />}
                    />
                </Stack>
            </LocalizationProvider>
        </div>
*/