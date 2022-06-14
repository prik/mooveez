import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  logoLink: {
    padding: '7.5% 0 7.5% 15px',
    textDecoration: 'none',
  },
  logo: {
    fontSize: '2.3rem !important',
    fontWeight: '800 !important',
  },
  light: {
    color: '#1976d2',
  },
  dark: {
    color: '#e50914',
  },
  links: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  genreImage: {
    filter: theme.palette.mode === 'dark' && 'invert(1)',
  },
}));
