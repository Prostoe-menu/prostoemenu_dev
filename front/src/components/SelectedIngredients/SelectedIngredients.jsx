import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';
import {
  resetSelected,
  setSelected,
} from 'store/slices/ingredients/ingredientsSlice';
import Button from 'ui/Button';
import styles from './SelectedIngredients.module.scss';

const SelectedIngredients = () => {
  const dispatch = useDispatch();
  const [isHover, setHover] = useState(false);
  const selected = useSelector((state) => state.ingredients.selected);

  const removeIngredient = (item) => {
    dispatch(setSelected(selected.filter((el) => el !== item)));
  };

  const removeAll = () => {
    dispatch(resetSelected());
  };

  return (
    selected.length > 0 && (
      <ul className={styles.container}>
        {selected.map((el) => (
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
