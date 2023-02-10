import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Style from './App.module.scss';
import Header from '../Header/Header';
import AddRecipe from '../AddRecipe/AddRecipe';

const App = () => (
  <div className={Style.app}>
    <Header />
    <Routes>
      <Route path="/" element={<AddRecipe />} />
    </Routes>
  </div>
);

export default App;
