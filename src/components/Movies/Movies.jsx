import { Box, CircularProgress, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { FeaturedMovie, MovieList, Pagination } from '..';
import { useGetMoviesQuery } from '../../services/TMDB';

const Movies = () => {
  const [page, setPage] = React.useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });
  const isLarge = useMediaQuery((theme) => theme.breakpoints.only('lg'));

  const numberOfMovies = isLarge ? 17 : 19;

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
    <>
      <FeaturedMovie movie={data.results[0]} />
      <MovieList movies={data} amount={numberOfMovies} excludeFirst />
      <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} />
    </>
  );
};

export default Movies;
