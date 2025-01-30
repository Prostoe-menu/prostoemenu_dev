import { NavLink } from 'react-router-dom';
import useResetIngredients from 'hooks/useResetIngredients';
import styles from './Navbar.module.scss';

const Navbar = ({ navigation }) => {
  const resetIngredients = useResetIngredients();

  const handleClick = (e) => {
    if (e.target.dataset.value === 'Главная') resetIngredients();
  };

  return (
    <nav>
      <ul className={styles.list}>
        {navigation.map((item) => (
          <li key={item.id} className={styles.item}>
            <NavLink
              className={styles.link}
              to={item.route}
              onClick={handleClick}
              data-value={item.name}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
