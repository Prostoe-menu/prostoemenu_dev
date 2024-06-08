import { Link } from 'react-router-dom';
import Logo from 'components/Layout/Logo/Logo';
import Navbar from 'components/Navbar/Navbar';
import navigation from 'utils/navigation';
import styles from './Header.module.scss';

const Header = () => (
  <header className={styles.header}>
    <Link className={styles.logo_link} to="/">
      <Logo />
    </Link>
    <Navbar navigation={navigation} />
  </header>
);

export default Header;
