import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from 'ui/Logo';
import { AGREEMENT_URL } from 'utils/constants';
import resetIngredients from 'utils/resetIngredients';
import styles from './Footer.module.scss';

const Footer = () => {
  const dispatch = useDispatch();

  const handleReset = () => {
    resetIngredients(dispatch);
  };

  return (
    <footer className={styles.footer}>
      <Link className={styles.logo} to="/" onClick={handleReset}>
        <Logo />
      </Link>

      <p className={styles.links}>
        <a
          className={styles.agreement}
          href={AGREEMENT_URL}
          target="_blank"
          rel="noreferrer"
        >
          Пользовательское соглашение
        </a>
        <span className={styles.copyright}>
          &copy;&nbsp;Простое&nbsp;Меню, 2023. Все права защищены.
        </span>
      </p>
    </footer>
  );
};

export default Footer;
