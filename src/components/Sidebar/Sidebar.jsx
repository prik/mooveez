import React from 'react';
import { List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { useGetGenresQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

const Sidebar = (({ setIsMobileDrawerOpen }) => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);
  const { data, isFetching } = useGetGenresQuery();

  const categories = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
  ];

  React.useEffect(() => {
    setIsMobileDrawerOpen?.(false);
  }, [genreIdOrCategoryName]);

  return (
    <>
      <Link to="/" className={classes.logoLink}>
        <Typography variant="h1" className={`${classes.logo} ${theme.palette.mode === 'light' ? classes.light : classes.dark}`}>
          Mooveez
        </Typography>
      </Link>
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }} onClick={() => dispatch(selectGenreOrCategory(value))} button>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <img
                  src={genreIcons[label.toLowerCase().replace(' ', '_')]}
                  height={20}
                  className={classes.genreImage}
                  alt={`${value}_img`}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          data.genres.map(({ id, name }) => (
            <Link key={id} className={classes.links} to="/">
              <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }} onClick={() => dispatch(selectGenreOrCategory(id))} button>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <img
                    src={genreIcons[name.toLowerCase().replace(' ', '_')]}
                    height={20}
                    className={classes.genreImage}
                    alt={`${name}_img`}
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))
        )}
      </List>
    </>
  );
});

export default Sidebar;
