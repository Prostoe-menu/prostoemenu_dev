import logo from 'images/logo.svg';
import Style from './Logo.module.scss';

const Logo = () => (
  <img className={Style.logo} src={logo} alt="Логотип приложения" />
);

export default Logo;
