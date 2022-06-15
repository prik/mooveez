import React from 'react';
import { Search as SearchIcon } from '@mui/icons-material';
import { InputAdornment, TextField, useMediaQuery } from '@mui/material';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { searchMovie } from '../../features/currentGenreOrCategory';

const Search = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [query, setQuery] = React.useState('');
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const handleKeypress = (event) => {
    // if (event.key === 'Enter') {
    setQuery(event.target.value);
    if (query.length > 1) dispatch(searchMovie(query));
    // }
  };

  return (
    <div className={classes.searchContainer}>
      {/* <DebounceInput
        minLength={2}
        debounceTimeout={300}
        onChange={(e) => handleKeypress(e)}
        className={classes.input}
      /> */}
      <TextField
        variant={isSmallScreen ? 'standard' : 'filled'}
        value={query}
        onKeyPress={(e) => handleKeypress(e)}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Search;
