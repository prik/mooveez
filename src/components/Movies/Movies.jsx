import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { MovieList } from '..';
import { useGetPopularQuery } from '../../services/TMDB';

const Movies = () => {
  const { data, error, isFetching } = useGetPopularQuery();

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" mt="150px">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No results found.<br />Please try a different search query.
        </Typography>
      </Box>
    );
  }

  if (error) return 'An error has occurred.';

  return (
    <MovieList movies={data} />
  );
};

export default Movies;
