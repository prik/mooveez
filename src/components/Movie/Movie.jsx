import { Grid, Grow, Rating, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const Movie = ({ movie, i }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
      <Grow in key={i} timeout={(i + 1) * 250}>
        <Link to={`/movies/${movie.id}`} className={classes.link}>
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://www.fillmurray.com/200/300'}
            className={classes.image}
            alt={movie.title}
          />
          <Tooltip disableTouchListener title={`Rated ${movie.vote_average / 2} / 5`}>
            <div><Rating readOnly value={movie.vote_average / 2} precision={0.1} /></div>
          </Tooltip>
          <Typography variant="subtitle2" className={classes.title}>
            {movie.title}
          </Typography>
        </Link>
      </Grow>
    </Grid>
  );
};

export default Movie;
