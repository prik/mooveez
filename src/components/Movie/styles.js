import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  movie: {
    padding: 10,
  },
  link: {
    textDecoration: 'none',
    alignItems: 'center',
    fontWeight: 'bolder',
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
      flexDirection: 'column',
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
  image: {
    borderRadius: 20,
    marginBottom: 10,
    '&:hover': {
      transform: 'scale(1.05)',
    },
    height: 300,
    [theme.breakpoints.down('xl')]: {
      height: 330,
    },
    [theme.breakpoints.down('sm')]: {
      height: 400,
    },
  },
  title: {
    color: theme.palette.text.primary,
    width: 230,
    marginBottom: '15px !important',
    textAlign: 'center',
  },
}));
