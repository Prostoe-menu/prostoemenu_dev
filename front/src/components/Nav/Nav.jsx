import React from 'react';
import { NavLink } from 'react-router-dom';
import Style from './Nav.module.scss';

const Nav = ({ navigation }) => (
  <nav className={Style.nav}>
    <ul className={Style.list}>
      <li className={Style.list__item}>
        {navigation.map((item) => (
          <NavLink
            className={Style.list__link}
            to={item.route}
            key={item.id}
            id={item.id}
          >
            {item.name}
          </NavLink>
        ))}
      </li>
    </ul>
  </nav>
);

export default Nav;
