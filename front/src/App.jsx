import { Route, Routes } from 'react-router-dom';
import AddRecipeForm from 'components/AddRecipeForm/AddRecipeForm';
import Footer from 'components/Layout/Footer/Footer';
import Header from 'components/Layout/Header/Header';
import Modal from 'components/Modal/Modal';
import ToastNotifications from 'components/Toast/ToastNotifications';
import HomePage from 'pages/HomePage';
import styles from './App.module.scss';

const App = () => (
  <div className={styles.app}>
    <Header />
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
