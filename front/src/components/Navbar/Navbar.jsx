import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';

const Navbar = ({ navigation }) => (
  <nav>
    <ul className={styles.list}>
      {navigation.map((item) => (
        <li key={item.id} className={styles.item}>
          <NavLink className={styles.link} to={item.route}>
            {item.name}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navbar;
