import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { MovieList } from '..';
import { useGetMoviesQuery } from '../../services/TMDB';

const Movies = () => {
  const [page, setPage] = React.useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });

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
