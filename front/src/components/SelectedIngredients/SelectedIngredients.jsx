import { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import Button from 'components/UI/Button/Button';
import styles from './SelectedIngredients.module.scss';

const SelectedIngredients = ({ selected, setSelected }) => {
  const [isHover, setHover] = useState(false);

  const removeIngredient = (item) => {
    setSelected(selected.filter((el) => el !== item));
  };

  const removeAll = () => {
    setSelected([]);
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
          <p>Очистить всё</p>
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
