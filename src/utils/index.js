import axios from 'axios';

export const movieApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
  },
});

export const getTmdbToken = async () => {
  try {
    const { data: { success, request_token: requestToken } } = await movieApi.get('/authentication/token/new');

    if (success) {
      localStorage.setItem('tmdb_token', requestToken);
      window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${window.location.origin}/approved`;
    }
  } catch (error) {
    console.log('Sorry, your token could not be created.', error.message);
  }
};

export const createTmdbSessionId = async () => {
  try {
    const { data: { success, session_id: sessionId } } = await movieApi.post('/authentication/session/new', {
      request_token: localStorage.getItem('tmdb_token'),
    });

    if (success && sessionId !== undefined) {
      localStorage.setItem('tmdb_session_id', sessionId);
    }

    return sessionId;
  } catch (error) {
    console.log('Sorry, your TMDB session could not be created.', error.message);
  }

  return null;
};

export const logout = () => {
  localStorage.clear();
  window.location.href = '/';
};

