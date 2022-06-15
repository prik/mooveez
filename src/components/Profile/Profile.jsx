import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../features/auth';

const Profile = () => {
  const { user, isAuthenticated } = useSelector(userSelector);

  return (
    <div>Hello, {user.username}!</div>
  );
};

export default Profile;
