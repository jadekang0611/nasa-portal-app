import React, { useEffect, useState } from 'react';

import {
  InputLabel,
  Button,
  TextField,
  MenuItem,
  Select,
  Grid,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon';

// Custom Components
import DatePicker from '../datePicker/DatePicker';
import API from '../../api';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  search: {
    //margin: theme.spacing(3, 0, 2),
    backgroundColor: '#E50914',
    color: 'white',
    '&:hover': {
      backgroundColor: '#f40612',
    },
    maxWidth: '200px',
    marginRight: '10px',
  },
  reset: {
    backgroundColor: 'transparent',
    color: '#000',
    '&:hover': {
      backgroundColor: '#f40612',
    },
    maxWidth: '200px',
  },
  results: {
    marginTop: theme.spacing(6),
  },
  centered: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    /* bring your own prefixes */
    transform: 'translate(-50%, -50%)',
  },
}));

export default function SearchResultForm(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    rovers: 'curiosity',
    sol: '',
    datetype: 'earth',
    cameras: 'all',
    date: DateTime.now().toFormat('yyyy-MM-dd'),
  });
  const [dates, setDates] = useState({
    startDate: '',
  });

  const [earthDateVisible, setEarthDateVisible] = useState(true);
  const [solDateVisible, setSolDateVisible] = useState(false);
  const [dateType, setDateType] = useState('earth_date');

  useEffect(() => {
    if (filters.datetype === 'earth') {
      setEarthDateVisible(true);
      setDateType('earth_date');
    } else {
      setEarthDateVisible(false);
    }

    if (filters.datetype === 'sol') {
      setSolDateVisible(true);
      setDateType('sol');
    } else {
      setSolDateVisible(false);
    }
  }, [filters.datetype]);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });

    if (e.target.value === 'earth') {
      console.log('earth type selected');
    } else if (e.target.value === 'sol') {
      console.log('sol type selected');
    }
  };

  const resetForm = () => {
    setFilters({
      rovers: 'curiosity',
      sol: '',
      datetype: 'earth',
      cameras: 'all',
      date: DateTime.now().toFormat('yyyy-MM-dd'),
    });
    setDates({
      startDate: '',
    });
  };

  // TODO
  const handleDate = (name, date) => {
    console.log(name);
    console.log(date);
    let formatted_date = DateTime.fromJSDate(date).toFormat('yyyy-MM-dd');
    console.log(`dt: ${formatted_date}`);
    setFilters({
      ...filters,
      date: formatted_date,
    });
  };

  const handleSubmit = (e) => {};

  return (
    <form className={classes.form} onSubmit={handleSubmit} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <InputLabel>Rovers</InputLabel>
          <Select
            fullWidth
            labelId='rovers'
            id='rovers'
            name='rovers'
            value={filters.rovers ? filters.rovers : ''}
            label='Rovers'
            onChange={handleChange}
          >
            <MenuItem value={'curiosity'}>Curiosity</MenuItem>
            <MenuItem value={'opportunity'}>Opportunity</MenuItem>
            <MenuItem value={'spirit'}>Spirit</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel>Date Type</InputLabel>
          <Select
            fullWidth
            labelId='datetype'
            id='datetype'
            name='datetype'
            value={filters.datetype ? filters.datetype : ''}
            label='datetype'
            onChange={handleChange}
          >
            <MenuItem value={'earth'}>Earth Day</MenuItem>
            <MenuItem value={'sol'}>Sol</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          {earthDateVisible ? (
            <>
              <InputLabel>Available Start Date</InputLabel>

              <DatePicker name='startDate' handleDate={handleDate} />
            </>
          ) : (
            <TextField
              type='number'
              variant='standard'
              required
              fullWidth
              autoComplete='Sol'
              id='sol'
              label='Sol'
              name='sol'
              onChange={handleChange}
              value={filters.sol ? filters.sol : ''}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel>Cameras</InputLabel>
          <Select
            fullWidth
            labelId='cameras'
            id='cameras'
            name='cameras'
            label='Cameras'
            onChange={handleChange}
          >
            <MenuItem value={'all'}>All Cameras</MenuItem>
            <MenuItem value={'fhaz'}>FHAZ</MenuItem>
            <MenuItem value={'rhaz'}>RHAZ</MenuItem>
            <MenuItem value={'mast'}>MAST</MenuItem>
            <MenuItem value={'chemcam'}>CHEMCAM</MenuItem>
            <MenuItem value={'mahli'}>MAHLI </MenuItem>
            <MenuItem value={'mardi'}>MARDI </MenuItem>
            <MenuItem value={'navcam'}>NAVCAM </MenuItem>
            <MenuItem value={'pancam'}>PANCAM</MenuItem>
            <MenuItem value={'minites'}>MINITES</MenuItem>
          </Select>
        </Grid>
        <Grid container justifyContent='flex-end'>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            className={classes.search}
          >
            Search
          </Button>{' '}
          <Button
            onClick={resetForm}
            fullWidth
            variant='outlined'
            className={classes.reset}
          >
            Reset
          </Button>
        </Grid>
        <Grid item xs={12}>
          {loading && <CircularProgress />}
        </Grid>
      </Grid>
    </form>
  );
}
