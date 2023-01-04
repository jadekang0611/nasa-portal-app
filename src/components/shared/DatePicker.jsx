import React, { useState } from 'react';
import 'date-fns';

import { makeStyles } from '@material-ui/core/styles';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  picker: {
    width: '100%',
  },
}));

const DatePicker = (props) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    props.handleDate(props.name, date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        className={classes.picker}
        margin='normal'
        id='date-picker-dialog'
        label={props.label}
        format='MM/dd/yyyy'
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
}

export default DatePicker;