import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { ArrowBack, Movie } from '@mui/icons-material';
import useStyles from './styles';
import { useGetActorQuery, useGetMoviesByActorIdQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';
import Pagination from '../Pagination/Pagination';

const Actors = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: actor, isFetching, error } = useGetActorQuery(id);
  const { data: movies, isFetching: isFetchingMovies, error: moviesError } = useGetMoviesByActorIdQuery({ id, page });

  if (isFetching || isFetchingMovies) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (error || !actor || moviesError) return 'An error has occurred.';

  return (
    <Grid container spacing={3}>
      <Grid item lg={5} xl={4}>
        <img
          src={actor.profile_path ? `https://image.tmdb.org/t/p/w780/${actor.profile_path}` : 'https://www.fillmurray.com/500/800'}
          className={classes.image}
          alt={actor.name}
        />
      </Grid>
      <Grid item lg={7} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <Typography variant="h2" gutterBottom>
          {actor.name}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Born: {new Date(actor.birthday).toLocaleDateString()}
        </Typography>
        <Typography paragraph>
          {actor.biography}
        </Typography>
        <Box margin="2rem" display="flex" justifyContent="space-around">
          <Button variant="contained" target="_blank" rel="noopener noreferrer" href={`http://www.imdb.com/name/${actor.imdb_id}`} color="primary" endIcon={<Movie />}>IMDB</Button>
          <Button endIcon={<ArrowBack />} onClick={() => navigate(-1)} color="primary">
            Back
          </Button>
        </Box>
      </Grid>
      <Box margin="2rem 0">
        <Typography variant="h3" gutterBottom align="center">
          Movies
        </Typography>
        {movies
          ? <MovieList movies={movies} amount={12} />
          : 'No movies found.'}
        <Pagination currentPage={page} setPage={setPage} totalPages={movies.total_pages} />
      </Box>
    </Grid>
  );
};

export default Actors;

