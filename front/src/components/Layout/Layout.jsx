import React from 'react';
import { Outlet } from 'react-router-dom';
import Modal from 'components/Modal/Modal';
import ToastNotifications from 'components/Toast/ToastNotifications';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import styles from './Layout.module.scss';

const Layout = () => (
  <div className={styles.app}>
    <Header />
    <main className={styles.main}>
      <Outlet />
    </main>
    <Modal />
    <Footer />
    <ToastNotifications />
  </div>
);

export default Layout;
