import { Grid } from '@mui/material';
import React from 'react';
import { Movie } from '..';
import useStyles from './styles';

const MovieList = ({ movies, amount, excludeFirst }) => {
  const classes = useStyles();
  const firstMovie = excludeFirst ? 1 : 0;

  return (
    <Grid container className={classes.moviesContainer}>
      {movies.results.slice(firstMovie, amount).map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  );
};

export default MovieList;
