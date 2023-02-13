import React from 'react';
import { NavLink } from 'react-router-dom';
import Style from './Menu.module.scss';

const Menu = ({ isOpen, onClose, navigation }) => (
  <section className={`${Style.menu} ${isOpen && Style.openMenu}`}>
    <div className={Style.container}>
      <button
        className={Style.buttonClose}
        type="button"
        onClick={onClose}
        aria-label="Закрыть меню"
      />
      <nav className={Style.nav}>
        <ul className={Style.list}>
          {navigation.map((item) => (
            <li className={Style.list__item}>
              <NavLink
                className={Style.list__link}
                to={item.route}
                key={item.id}
                id={item.id}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </section>
);

export default Menu;
