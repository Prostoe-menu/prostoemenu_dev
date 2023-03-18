import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Style from './App.module.scss';
import Header from '../Header/Header';
import AddRecipe from '../AddRecipe/AddRecipe';
import Footer from '../Footer/Footer';
// import Toast from '../Toast/Toast';
import Modal from '../Modal/Modal';

const App = () => (
  <div className={Style.app}>
    <Header />
    <Routes>
      <Route path="/" element={<AddRecipe />} />
    </Routes>
    {/* <Toast>Какая-то ошибка</Toast> */}
    <Modal />
    <Footer />
  </div>
);

export default App;
