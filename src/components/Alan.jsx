import alanBtn from '@alan-ai/alan-sdk-web';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchMovie, selectGenreOrCategory } from '../features/currentGenreOrCategory';
import { getTmdbToken, logout } from '../utils';
import { ColorModeContext } from '../utils/ToggleColorMode';

const useAlan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setMode } = React.useContext(ColorModeContext);

  React.useEffect(() => {
    alanBtn({
      key: '18a2bce8acbd24b447c56a7900cfbb662e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, mode, genreOrCategory, genres, query }) => {
        if (command === 'chooseGenre') {
          const requestedGenre = genres.find((genre) => genre.name.toLowerCase() === genreOrCategory.toLowerCase());
          if (requestedGenre) {
            navigate('/');
            dispatch(selectGenreOrCategory(requestedGenre.id));
          } else {
            const category = genreOrCategory.startsWith('top') ? 'top_rated' : genreOrCategory;
            navigate('/');
            dispatch(selectGenreOrCategory(category));
          }
        }

        if (command === 'search') {
          navigate('/');
          dispatch(searchMovie(query));
        }

        if (command === 'changeMode') {
          setMode(mode);
        }

        if (command === 'login') {
          getTmdbToken();
        }

        if (command === 'logout') {
          logout();
        }
      },
    });
  }, []);
};

export default useAlan;
