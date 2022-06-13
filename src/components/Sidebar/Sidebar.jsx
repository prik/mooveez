import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import useStyles from './styles';
import { useGetGenresQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';

const blueLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const redLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const Sidebar = (({ setIsMobileDrawerOpen }) => {
  const theme = useTheme();
  const classes = useStyles();
  const { data, isFetching } = useGetGenresQuery();

  const categories = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
  ];

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          src={theme.palette.mode === 'light' ? blueLogo : redLogo}
          className={classes.image}
          alt="Mooveez logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem onClick={() => {}} button>
              <ListItemIcon>
                <img
                  src={genreIcons[label.toLowerCase().replace(' ', '_')]}
                  height={30}
                  className={classes.genreImage}
                  alt={`${value}_img`}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          data.genres.map(({ id, name }) => (
            <Link key={id} className={classes.links} to="/">
              <ListItem onClick={() => {}} button>
                <ListItemIcon>
                  <img
                    src={genreIcons[name.toLowerCase().replace(' ', '_')]}
                    height={30}
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
