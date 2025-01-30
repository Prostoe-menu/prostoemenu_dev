import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import resetIngredients from 'utils/resetIngredients';
import styles from './Navbar.module.scss';

const Navbar = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    if (e.target.dataset.value === 'Главная') resetIngredients(dispatch);
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
