import Modal from 'components/Modal';
import { ToastNotifications } from 'components/Toast';
import { Footer, Header } from './elements';
import styles from './Layout.module.scss';

const Layout = () => (
  <div className={styles.app}>
    <Header />
    <Modal />
    <Footer />
    <ToastNotifications />
  </div>
);

export default Layout;
