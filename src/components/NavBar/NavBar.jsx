import React from 'react';
import { AppBar, Toolbar, Drawer, Button, IconButton, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Sidebar, Search } from '..';
import useStyles from './styles';

const Navbar = () => {
  const theme = useTheme();
  const classes = useStyles();
  const isAuthenticated = true;
  const isMobile = useMediaQuery('(max-width:600px)');

  const [isDarkModeEnabled, setIsDarkModeEnabled] = React.useState(theme.palette.mode === 'dark');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = React.useState(false);

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
            <Button color="inherit" onClick={() => {}}>
              Login <AccountCircle sx={{ ml: 1 }} />
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="profile/:id" className={classes.linkButton} onClick={() => {}}>
              {!isMobile && <span style={{ marginRight: 10 }}>My Movies</span>}
              <Avatar style={{ width: 30, height: 30 }} alt="profile" src="https://i.pravatar.cc/30" />
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
