import axios from 'axios';

export const movieApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
  },
});

export const getTmdbToken = async () => {
  try {
    const { data: { success, request_token } } = await movieApi.get('/authentication/token/new');

    if (success) {
      localStorage.setItem('tmdb_token', request_token);
      window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${window.location.origin}/approved`;
    }
  } catch (error) {
    console.log('Sorry, your token could not be created.', error.message);
  }
};

export const createTmdbSessionId = async () => {
  try {
    const { data: { success, session_id } } = await movieApi.post('/authentication/session/new', {
      request_token: localStorage.getItem('tmdb_token'),
    });

    if (success && session_id !== undefined) {
      localStorage.setItem('tmdb_session_id', session_id);
    }

    return session_id;
  } catch (error) {
    console.log('Sorry, your TMDB session could not be created.', error.message);
  }
};
