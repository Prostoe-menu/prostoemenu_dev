import { Link } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Logo from 'ui/Logo';

import styles from './Header.module.scss';

const Header = () => (
  <header className={styles.header}>
    <Link className={styles.logo_link} to="/">
      <Logo />
    </Link>
    <Navbar />
  </header>
);

export default Header;
