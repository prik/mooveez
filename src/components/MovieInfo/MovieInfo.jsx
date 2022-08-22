import { Box, CircularProgress, Grid, Rating, Typography, ButtonGroup, Button, Modal } from '@mui/material';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowBack, Favorite, FavoriteBorderOutlined, Language, Movie, Theaters, Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useGetListQuery, useGetMovieQuery, useGetRecommendationsQuery } from '../../services/TMDB';
import useStyles from './styles';
import genreIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import MovieList from '../MovieList/MovieList';
import { userSelector } from '../../features/auth';

const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY;

const MovieInfo = () => {
  const { user } = useSelector(userSelector);
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: movie, isFetching, error } = useGetMovieQuery(id);
  const { data: recommendations, isFetching: isRecommendationsFetching } = useGetRecommendationsQuery(id);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = React.useState(false);
  const { data: favoriteMovies } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('tmdb_session_id'), page: 1 });
  const { data: watchlistMovies } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('tmdb_session_id'), page: 1 });

  const [isMovieFavorited, setIsMovieFavorited] = React.useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = React.useState(false);

  React.useEffect(() => {
    setIsMovieFavorited(!!favoriteMovies?.results?.find((favMovie) => favMovie?.id === movie?.id));
  }, [favoriteMovies, movie]);

  React.useEffect(() => {
    setIsMovieWatchlisted(!!watchlistMovies?.results?.find((watchlistMovie) => watchlistMovie?.id === movie?.id));
  }, [watchlistMovies, movie]);

  const addToFavorites = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${tmdbApiKey}&session_id=${localStorage.getItem('tmdb_session_id')}`, {
      media_type: 'movie',
      media_id: id,
      favorite: !isMovieFavorited,
    });

    setIsMovieFavorited((prev) => !prev);
  };

  console.log({ isMovieWatchlisted });

  const addToWatchlist = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${tmdbApiKey}&session_id=${localStorage.getItem('tmdb_session_id')}`, {
      media_type: 'movie',
      media_id: id,
      watchlist: !isMovieWatchlisted,
    });

    setIsMovieWatchlisted((prev) => !prev);
  };

  if (isFetching || isRecommendationsFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (error || !movie) return 'An error has occurred.';
  console.log(movie);

  return (
    <Grid container className={classes.movieInfoContainer}>
      <Grid item sm={12} md={4}>
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://www.fillmurray.com/500/800'}
          className={classes.poster}
          alt={movie.title}
        />
      </Grid>
      <Grid item container direction="column" md={7}>
        <Typography variant="h3" display="inline" align="center" gutterBottom>
          {movie.title} <Typography variant="body1" display="inline">{movie.release_date.split('-')[0]}</Typography>
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {movie.tagline}
        </Typography>
        <Grid item className={classes.movieMetaContainer}>
          <Box display="flex" align="center">
            <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            <Typography variant="subtitle1" style={{ marginLeft: 10 }} gutterBottom>
              {movie.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant="subtitle1" align="center" gutterBottom>
            {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
            - {movie.original_language === 'end' ? 'English' : movie.original_language.toUpperCase()}
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {movie.genres?.map((genre) => (
            <Link
              key={genre.name}
              to="/"
              className={classes.links}
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <img
                src={genreIcons[genre.name.toLowerCase().replace(' ', '_')]}
                height={20}
                className={classes.genreImage}
                alt={`${genre.name}_img`}
              />
              <Typography variant="subtitle1" color="textPrimary">
                {genre.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" style={{ marginTop: 10 }} gutterBottom>
          Overview
        </Typography>
        <Typography paragraph>
          {movie.overview}
        </Typography>
        <Typography variant="h5" style={{ marginTop: 10 }} gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {movie.credits?.cast.slice(0, 6).map((character, i) => (
            character.profile_path && (
            <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{ textDecoration: 'none' }}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                className={classes.castImage}
                alt={character.name}
              />
              <Typography variant="body1" color="textPrimary" style={{ fontSize: '0.8em' }}>
                {character.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" style={{ fontSize: '0.75em' }}>
                {character.character}
              </Typography>
            </Grid>
            )
          ))}
        </Grid>
        <Grid item container style={{ marginTop: '2rem' }}>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                <Button target="_blank" rel="noopener noreferrer" href={movie.homepage} endIcon={<Language />}>Website</Button>
                <Button target="_blank" rel="noopener noreferrer" href={`http://www.imdb.com/title/${movie.imdb_id}`} endIcon={<Movie />}>IMDB</Button>
                <Button onClick={() => { setIsTrailerModalOpen(true); }} href="#" endIcon={<Theaters />}>Trailer</Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                  {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Visibility /> : <VisibilityOff />}>
                  {isMovieWatchlisted ? 'Unwatchlist' : 'Watchlist'}
                </Button>
                <Button endIcon={<ArrowBack />}>
                  <Typography component={Link} to="/" color="inherit" variant="subtitle2" style={{ textDecoration: 'none' }}>
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {recommendations
          ? <MovieList movies={recommendations} amount={12} />
          : 'No recommendations found.'}
      </Box>
      <Modal
        closeAfterTransition
        className={classes.modal}
        open={isTrailerModalOpen}
        onClose={() => { setIsTrailerModalOpen(false); }}
      >
        {movie.videos.results.length > 0 && (
          <iframe
            autoPlay
            className={classes.video}
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
            title={`${movie.title} Trailer`}
            frameBorder="0"
            allow="autoplay"
          />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInfo;
