import React from 'react';
import { Search as SearchIcon } from '@mui/icons-material';
import { InputAdornment, TextField, useMediaQuery } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useStyles from './styles';
import { searchMovie } from '../../features/currentGenreOrCategory';

const Search = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = React.useState('');
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  React.useEffect(() => {
    if (query.length > 2) {
      navigate('/');
      dispatch(searchMovie(query));
    }
  }, [query]);

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
