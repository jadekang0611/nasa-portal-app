import React from 'react';

import {
  InputLabel,
  Button,
  TextField,
  MenuItem,
  Select,
  Grid,
  FormControl,
} from '@material-ui/core';
import { DateTime } from 'luxon';

// Custom Components
import DatePicker from '../datePicker/DatePicker';
import API from '../../api';
import { useSearchFormStyle } from '../../styles';

const SearchResultForm = ({ handleResults, page, handlePage }) => {
  const classes = useSearchFormStyle();

  const [loading, setLoading] = React.useState(true);

  const [filters, setFilters] = React.useState({
    rovers: 'curiosity',
    sol: '',
    datetype: 'earth',
    cameras: 'all',
    date: DateTime.now().toFormat('yyyy-MM-dd'),
  });

  const [dates, setDates] = React.useState({
    startDate: '',
  });

  const [earthDateVisible, setEarthDateVisible] = React.useState(true);
  const [solDateVisible, setSolDateVisible] = React.useState(false);
  const [dateType, setDateType] = React.useState('earth_date');
  const [isAllSelected, setAllSelected] = React.useState(false);

  React.useEffect(() => {
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
    handlePage();
  };

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

  React.useEffect(() => {
    if (dateType === 'sol') {
      console.log(dateType);
      console.log(`sol length: ${filters.sol.length}`);
      filters.sol.length > 0 ? setAllSelected(true) : setAllSelected(false);
    } else {
      filters.date !== null ? setAllSelected(true) : setAllSelected(false);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePage();

    (async () => {
      try {
        setLoading(true);

        //build query string
        let chosen_date = '';
        if (filters.datetype === 'earth') {
          chosen_date = filters.date;
        } else if (filters.datetype === 'sol') {
          chosen_date = filters.sol;
        }

        console.log(`chosen date: ${chosen_date}`);
        console.log(filters.cameras);
        let query;
        if (filters.cameras === 'all') {
          query = `${filters.rovers}/photos?${dateType}=${chosen_date}&page=${page}&api_key=${process.env.REACT_APP_NASA_API_KEY}`;
        } else {
          query = `${filters.rovers}/photos?${dateType}=${chosen_date}&camera=${filters.cameras}&page=${page}&${process.env.REACT_APP_NASA_API_KEY}`;
        }

        console.log(query);

        let res = await API.get(query);
        setLoading(false);
        console.log(res.data.photos);
        handleResults(
          res.data.photos,
          filters.rovers,
          dateType,
          chosen_date,
          filters.cameras,
          true
        );
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    })();
  };

  const menuProps = {
    getContentAnchorEl: null,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl variant='standard' fullWidth>
            <InputLabel className={classes.label}>Rovers</InputLabel>
            <Select
              fullWidth
              labelId='rovers'
              id='rovers'
              name='rovers'
              value={filters.rovers ? filters.rovers : ''}
              label='Rovers'
              onChange={handleChange}
              MenuProps={menuProps}
            >
              <MenuItem value={'curiosity'}>Curiosity</MenuItem>
              <MenuItem value={'opportunity'}>Opportunity</MenuItem>
              <MenuItem value={'spirit'}>Spirit</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel className={classes.label}>Date Type</InputLabel>
            <Select
              fullWidth
              labelId='datetype'
              id='datetype'
              name='datetype'
              value={filters.datetype ? filters.datetype : ''}
              label='datetype'
              onChange={handleChange}
              MenuProps={menuProps}
            >
              <MenuItem value={'earth'}>Earth Day</MenuItem>
              <MenuItem value={'sol'}>Sol</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          {earthDateVisible ? (
            <>
              <InputLabel className={classes.label}>Earth Date</InputLabel>

              <DatePicker name='startDate' handleDate={handleDate} />
            </>
          ) : (
            <>
              <TextField
                className='solField'
                type='number'
                variant='standard'
                required
                fullWidth
                autoComplete='Sol'
                id='sol'
                InputLabelProps={{
                  className: classes.textField,
                }}
                label='Sol Date'
                name='sol'
                onChange={handleChange}
                value={filters.sol ? filters.sol : ''}
              />
            </>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel className={classes.label}>Cameras</InputLabel>
            <Select
              fullWidth
              labelId='cameras'
              id='cameras'
              name='cameras'
              value={filters.cameras ? filters.cameras : ''}
              label='Cameras'
              onChange={handleChange}
              MenuProps={menuProps}
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
          </FormControl>
        </Grid>
        <Grid
          container
          justifyContent='flex-end'
          className={classes.btnWrapper}
        >
          <Button
            type='submit'
            fullWidth
            variant='contained'
            className={isAllSelected ? classes.searchBtn : classes.inActiveBtn}
            disabled={!isAllSelected}
          >
            Search
          </Button>{' '}
          <Button
            onClick={resetForm}
            fullWidth
            variant='outlined'
            className={classes.resetBtn}
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SearchResultForm;
