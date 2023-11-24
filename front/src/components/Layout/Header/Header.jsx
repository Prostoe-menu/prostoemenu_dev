import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from 'components/Layout/Logo/Logo';
import Menu from 'components/Navigation/Menu/Menu';
import Style from './Header.module.scss';

const Header = () => {
  const navigation = [
    {
      name: 'Каталог рецептов',
      route: '/',
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
