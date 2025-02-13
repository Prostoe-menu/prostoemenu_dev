import { useEffect } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import Modal from 'components/Modal';
import { ToastNotifications } from 'components/Toast';
import { Footer, Header } from './elements';
import styles from './Layout.module.scss';

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Скролл наверх, работает в сочетании с <ScrollRestoration />
  }, [location]);

  return (
    <div className={styles.app}>
      <ScrollRestoration />
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Modal />
      <Footer />
      <ToastNotifications />
    </div>
  );
};

export default Layout;
