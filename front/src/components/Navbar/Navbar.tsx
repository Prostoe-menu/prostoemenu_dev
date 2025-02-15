import { NavLink } from 'react-router-dom';
import { NAVIGATION } from 'utils/navigation';
import styles from './Navbar.module.scss';

const Navbar = () => (
  <nav>
    <ul className={styles.list}>
      {NAVIGATION?.map((item) => (
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
