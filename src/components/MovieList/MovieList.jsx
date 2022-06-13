import { Grid } from '@mui/material';
import React from 'react';
import { Movie } from '..';
import useStyles from './styles';

const MovieList = ({ movies }) => {
  const classes = useStyles();
  console.log(movies);

  return (
    <Grid container className={classes.moviesContainer}>
      {movies.results.map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  );
};

export default MovieList;
