import React from 'react';
import Style from './Header.module.scss';
import Logo from '../Logo/Logo';

const Header = () => (
  <header className={Style.header}>
    <Logo />
  </header>
);

export default Header;
