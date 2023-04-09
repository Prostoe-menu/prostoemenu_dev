import React from 'react';
import Style from './Logo.module.scss';
import logo from '../../../images/logo.svg';

const Logo = () => (
  <img className={Style.logo} src={logo} alt="Логотип приложения" />
);

export default Logo;
