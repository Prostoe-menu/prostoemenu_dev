import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Style from './Header.module.scss';
import Logo from '../Logo/Logo';
import Menu from '../../Navigation/Menu/Menu';

const Header = () => {
  const navigation = [
    {
      name: 'Каталог рецептов',
      route: '/catalogue',
      id: 1,
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <header className={Style.header}>
      <Link className={Style.logoLink} to="/">
        <Logo />
      </Link>
      <button
        className={Style.buttonMenu}
        type="button"
        aria-label="Открыть меню"
        onClick={openMenu}
      />
      <Menu
        navigation={navigation}
        isHeader="true"
        isOpen={isMenuOpen}
        onClose={closeMenu}
      />
    </header>
  );
};

export default Header;
