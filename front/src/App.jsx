import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Style from './App.module.scss';
import Header from './components/Layout/Header/Header';
import AddRecipeForm from './components/AddRecipeForm/AddRecipeForm';
import Footer from './components/Layout/Footer/Footer';
import RecipeSelection from './components/RecipeSelection/RecipeSelection';
import Modal from './components/Modal/Modal';
import ToastNotifications from './components/Toast/ToastNotifications';
import HomePage from './pages/HomePage';

const App = () => (
  <div className={Style.app}>
    <Header />
    <RecipeSelection />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/new-recipe" element={<AddRecipeForm />} />
    </Routes>
    <Modal />
    <Footer />
    <ToastNotifications />
  </div>
);

export default App;
