import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Logo from 'ui/Logo';
import navigation from 'utils/navigation';
import resetIngredients from 'utils/resetIngredients';
import styles from './Header.module.scss';

const Header = () => {
  const dispatch = useDispatch();

  const handleReset = () => {
    resetIngredients(dispatch);
  };

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
