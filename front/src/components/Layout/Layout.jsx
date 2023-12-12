import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from 'components/Layout/Footer/Footer';
import Header from 'components/Layout/Header/Header';
import Modal from 'components/Modal/Modal';
import ToastNotifications from 'components/Toast/ToastNotifications';
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
