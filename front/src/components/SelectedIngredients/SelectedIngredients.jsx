import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';
import {
  resetSelectedIngredients,
  setSelectedIngredients,
} from 'store/slices/ingredients/ingredientsSlice';
import Button from 'ui/Button';
import styles from './SelectedIngredients.module.scss';

const SelectedIngredients = () => {
  const dispatch = useDispatch();
  const selectedIngredients = useSelector(
    (state) => state.ingredients.selectedIngredients
  );
  const [isHover, setHover] = useState(false);

  const removeIngredient = (item) => {
    dispatch(
      setSelectedIngredients(selectedIngredients.filter((el) => el !== item))
    );
  };

  const removeAll = () => {
    dispatch(resetSelectedIngredients());
  };

  return (
    selectedIngredients.length > 0 && (
      <ul className={styles.container}>
        {selectedIngredients.map((el) => (
          <li className={styles.item} key={uuidV4()}>
            {el}
            <Button
              view="cross"
              className={styles.cross_btn}
              onClick={() => removeIngredient(el)}
            />
          </li>
        ))}
        <div
          className={styles.remove_btn}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={removeAll}
        >
          Очистить всё
          <Button
            view="cross"
            className={
              isHover ? ` ${styles.remove_all_cross}` : `${styles.cross_btn}`
            }
          />
        </div>
      </ul>
    )
  );
};

export default SelectedIngredients;
