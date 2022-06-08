import React from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { NavBar, Movies, MovieInfo, Actors, Profile } from '.';

const App = () => (
  <div>
    <CssBaseline />
    <NavBar />
    <main>
      <h1>Welcome to Mooviez, mate!</h1>
      <Routes>
        <Route exact path="/" element={<Movies />} />
        <Route exact path="/actors" element={<Actors />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
    </main>
  </div>
);

export default App;
