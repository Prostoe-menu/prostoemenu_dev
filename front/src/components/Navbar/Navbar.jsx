import React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import CloseButton from 'components/UI/CloseButton/CloseButton';
import styles from './Navbar.module.scss';

// Компонент будет рефакториться и дорабатываться в рамках Issue https://github.com/Prostoe-menu/prostoemenu_dev/issues/109
const Navbar = ({ isOpen, onClose, navigation, isHeader }) => {
  const menuClass = classnames(
    styles.menu,
    { [styles.menu_type_header]: isHeader },
    { [styles.menu_visible]: isOpen }
  );
  const containerClass = classnames(styles.container, {
    [styles.container_type_header]: isHeader,
  });
  const buttonClass = classnames(styles.buttonClose, {
    [styles.buttonClose_visible]: isHeader && isOpen,
  });
  const navClass = classnames(styles.nav, {
    [styles.nav_type_header]: isHeader,
  });
  const listItemClass = classnames(styles.list__item, {
    [styles.list__item_type_header]: isHeader,
  });

  return (
    <section className={menuClass}>
      <div className={containerClass}>
        {/* <button
          className={buttonClass}
          type="button"
          onClick={onClose}
          aria-label="Закрыть меню"
        /> */}
        <CloseButton onClose={onClose} className={buttonClass} />
        <nav className={navClass}>
          <ul className={styles.list}>
            {navigation.map((item) => (
              <li key={item.id} className={listItemClass}>
                <NavLink
                  className={styles.list__link}
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
};

export default Navbar;
