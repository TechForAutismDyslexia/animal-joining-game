import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './components/Game';

const App = () => (
  <BrowserRouter basename="/games/animalmatching">
    <Routes>
      <Route path="/" element={<Game />} />
    </Routes>
  </BrowserRouter>
);

export default App;
