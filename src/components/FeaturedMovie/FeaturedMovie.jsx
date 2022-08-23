import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import useSyles from './styles';

const FeaturedMovie = ({ movie }) => {
  const classes = useSyles();

  if (!movie) return null;

  return (
    <Box component={Link} to={`/movies/${movie.id}`} className={classes.featuredCardContainer}>
      <Card className={classes.card} classes={{ root: classes.cardRoot }}>
        <CardMedia
          media="picture"
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie.title}
          title={movie.title}
          className={classes.cardMedia}
          // style={{ background: `linear-gradient(#e66465, #9198e5, transparent), url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")` }}

        />
        <Box padding="20px">
          <CardContent className={classes.cardContent} classes={{ root: classes.cardContentRoot }}>
            <Typography variant="h5" gutterBottom>{movie.title}</Typography>
            <Typography variant="body2">{movie.overview}</Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default FeaturedMovie;
