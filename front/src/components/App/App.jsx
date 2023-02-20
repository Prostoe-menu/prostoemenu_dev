import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Style from './App.module.scss';
import Header from '../Header/Header';
import AddRecipe from '../AddRecipe/AddRecipe';
// import Toast from '../Toast/Toast';
import Footer from '../Footer/Footer';

const App = () => (
  <div className={Style.app}>
    <Header />
    <Routes>
      <Route path="/" element={<AddRecipe />} />
    </Routes>
    {/* <Toast>Какая-то ошибка</Toast> */}
    <Footer />
  </div>
);

export default App;
