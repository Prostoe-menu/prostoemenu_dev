import { Outlet } from 'react-router-dom';
import { ToastNotifications } from 'components/Toast';
import { Footer, Header } from './elements';
import styles from './Layout.module.scss';

const Layout = () => (
  <div className={styles.app}>
    <Header />

    <main className={styles.main}>
      <Outlet />
    </main>

    <Footer />

    <ToastNotifications />
  </div>
);

export default Layout;
