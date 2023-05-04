import React from 'react';
import { NavLink } from 'react-router-dom';
import Style from './Menu.module.scss';

const Menu = ({ isOpen, onClose, navigation, isHeader }) => (
  <section
    className={`
      ${Style.menu}
      ${isHeader && Style.menu_type_header}
      ${isOpen && Style.menu_visible}`}
  >
    <div
      className={`${Style.container}
      ${isHeader && Style.container_type_header}`}
    >
      <button
        className={`${Style.buttonClose}
        ${isHeader && isOpen && Style.buttonClose_visible}`}
        type="button"
        onClick={onClose}
        aria-label="Закрыть меню"
      />
      <nav className={`${Style.nav} ${isHeader && Style.nav_type_header}`}>
        <ul className={Style.list}>
          {navigation.map((item) => (
            <li
              key={item.id}
              className={`${Style.list__item} ${
                isHeader && Style.list__item_type_header
              }`}
            >
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
