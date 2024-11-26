import { useState } from 'react'
import './App.css'
import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Navbar } from "./components/Navbar";
import { HomePage } from './pages/HomePage';
import { ShowPage } from './pages/ShowPage';
import { FavoritesPage } from './pages/FavoritesPage';

function App()  {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/show/:id" element={<ShowPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
