import React from 'react';
import { Link } from 'react-router-dom';
import Style from './Footer.module.scss';
import Logo from '../Logo/Logo';
import Menu from '../Menu/Menu';

const Footer = () => {
  const navigation = [
    {
      name: 'Каталог рецептов',
      route: '/catalogue',
      id: 1,
    },
    {
      name: 'Наша команда',
      route: '/team',
      id: 2,
    },
  ];
  return (
    <footer className={Style.footer}>
      <div className={Style.container}>
        <Link className={Style.logoLink} to="/">
          <Logo />
        </Link>
        <Menu navigation={navigation} />
      </div>
      <ul className={Style.list}>
        <li className={Style.list__item}>
          <a
            className={Style.list__link}
            href="*"
            target="_blank"
            rel="noreferrer"
          >
            Пользовательское соглашение
          </a>
        </li>
        <li className={Style.list__item}>
          <a
            className={Style.list__link}
            href="*"
            target="_blank"
            rel="noreferrer"
          >
            Политика конфиденциальности
          </a>
        </li>
      </ul>
      <p className={Style.text}>
        &copy; Простое Меню, 2023. Все права защищены.
      </p>
    </footer>
  );
};

export default Footer;
