import logo from 'assets/images/logo.svg';
import styles from './Logo.module.scss';

const Logo = () => (
  <img className={styles.logo} src={logo} alt="Логотип приложения" />
);

export default Logo;
