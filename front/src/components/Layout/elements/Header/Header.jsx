import { Link } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Logo from 'ui/Logo';
import useResetIngredients from 'hooks/useResetIngredients';
import navigation from 'utils/navigation';
import styles from './Header.module.scss';

const Header = () => {
  const handleReset = useResetIngredients();

  return (
    <header className={styles.header}>
      <Link className={styles.logo_link} to="/" onClick={handleReset}>
        <Logo />
      </Link>
      <Navbar navigation={navigation} />
    </header>
  );
};

export default Header;
