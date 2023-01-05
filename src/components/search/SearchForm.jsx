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
import { options_rover, options_cameras, options_date } from '../../data';
import { useSearchFormStyles } from '../../styles';

const SearchResultForm = ({
  handleResults,
  page,
  handlePage,
  handleSearch,
}) => {
  const classes = useSearchFormStyles();

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
    let formatted_date = DateTime.fromJSDate(date).toFormat('yyyy-MM-dd');
    setFilters({
      ...filters,
      date: formatted_date,
    });
  };

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
        let query;
        if (filters.cameras === 'all') {
          query = `${filters.rovers}/photos?${dateType}=${chosen_date}&page=${page}&api_key=${process.env.REACT_APP_NASA_API_KEY}`;
        } else {
          query = `${filters.rovers}/photos?${dateType}=${chosen_date}&camera=${filters.cameras}&page=${page}&api_key=${process.env.REACT_APP_NASA_API_KEY}`;
        }

        let res = await API.get(query);
        setLoading(false);

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
        console.log(`Having an issue with getting data from NASA - ${e}`);
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
              {options_rover.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}
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
              {options_date.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}
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
              {options_cameras.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}
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
            className={classes.searchBtn}
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
