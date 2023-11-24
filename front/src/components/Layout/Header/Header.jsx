import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from 'components/Layout/Logo/Logo';
import Navbar from 'components/Navbar/Navbar';
import Style from './Header.module.scss';

const Header = () => {
  const navigation = [
    {
      name: 'Главная',
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
      <Navbar
        navigation={navigation}
        isHeader="true"
        isOpen={isMenuOpen}
        onClose={closeMenu}
      />
    </header>
  );
};

export default Header;
