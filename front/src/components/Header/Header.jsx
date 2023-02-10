import React from 'react';
import Style from './Header.module.scss';
import Logo from '../Logo/Logo';
import Nav from '../Nav/Nav';

const Header = () => {
  const navigation = [
    {
      name: 'Каталог рецептов',
      route: '/',
      id: 1,
    },
  ];
  return (
    <header className={Style.header}>
      <Logo />
      <Nav navigation={navigation} />
    </header>
  );
};

export default Header;
