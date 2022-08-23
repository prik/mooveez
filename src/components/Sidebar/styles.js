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
    background: 'linear-gradient(to right, #00baff, #0059B2)',
    '-webkitBackgroundClip': 'text',
    textFillColor: 'transparent',
  },
  dark: {
    color: '#e50914',
    // background: 'linear-gradient(to right, #fb4032, #8b4aff)',
    background: 'linear-gradient(to right, #e6a6b1, #fb4032)',
    '-webkitBackgroundClip': 'text',
    textFillColor: 'transparent',
  },
  links: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  genreImage: {
    filter: theme.palette.mode === 'dark' && 'invert(1)',
  },
}));
