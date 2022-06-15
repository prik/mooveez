import { ExitToApp } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../features/auth';

const Profile = () => {
  const { user } = useSelector(userSelector);
  const favMovies = [];

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout <ExitToApp sx={{ ml: 1.5 }} />
        </Button>
      </Box>
      {!favMovies.length
        ? <Typography variant="h5">No favorite movies added yet.</Typography>
        : (
          <Box>FAV MOVIES</Box>
        )}
    </Box>
  );
};

export default Profile;
