import React from 'react';
import { AppBar, Toolbar, Drawer, Button, IconButton, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Sidebar, Search } from '..';
import { movieApi, getTmdbToken, createTmdbSessionId } from '../../utils';
import useStyles from './styles';
import { setUser, userSelector } from '../../features/auth';

const Navbar = () => {
  const { user, isAuthenticated } = useSelector(userSelector);
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const tmdbToken = localStorage.getItem('tmdb_token');
  const isMobile = useMediaQuery('(max-width:600px)');

  const [isDarkModeEnabled, setIsDarkModeEnabled] = React.useState(theme.palette.mode === 'dark');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = React.useState(false);

  React.useEffect(() => {
    const loginUser = async () => {
      if (!tmdbToken) return;
      const tmdbSessionId = localStorage.getItem('tmdb_session_id') || await createTmdbSessionId(tmdbToken);
      const { data: userData } = await movieApi.get(`/account?session_id=${tmdbSessionId}`);
      dispatch(setUser(userData));
    };

    loginUser();
  }, [tmdbToken]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton color="inherit" edge="start" onClick={() => { setIsMobileDrawerOpen((prevState) => !prevState); }} className={classes.menuButton}>
              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => { setIsDarkModeEnabled((prevState) => !prevState); }}>
            {isDarkModeEnabled ? <DarkModeOutlined /> : <LightModeOutlined />}
          </IconButton>
          {!isMobile && <Search />}
          {!isAuthenticated ? (
            <Button color="inherit" onClick={getTmdbToken}>
              Login <AccountCircle sx={{ ml: 1.5 }} />
            </Button>
          ) : (
            <Button color="inherit" component={Link} to={`profile/${user.id}`} className={classes.linkButton} onClick={() => {}}>
              {!isMobile && 'My Movies'}
              <Avatar
                sx={{ ml: 1.8 }}
                style={{ width: 35, height: 35 }}
                alt="profile"
                src={user.avatar.gravatar.hash
                  ? `https://www.gravatar.com/avatar/${user.avatar.gravatar.hash}`
                  : 'https://i.pravatar.cc/30'}
              />
            </Button>
          )}
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={isMobileDrawerOpen}
            onClose={() => setIsMobileDrawerOpen((prevState) => !prevState)}
            anchor="left"
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{ keepMounted: true }}
          >
            <Sidebar setIsMobileDrawerOpen={setIsMobileDrawerOpen} />
          </Drawer>
        ) : (
          <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }} open>
            <Sidebar />
          </Drawer>
        )}
      </nav>
    </>
  );
};

export default Navbar;
