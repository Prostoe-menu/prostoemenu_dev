import React from 'react';
import { v4 as uuidV4 } from 'uuid';
import Button from 'components/UI/Button/Button';
import style from './SelectedRecipeList.module.scss';

const SelectedRecipeList = ({ selected, setSelected }) => {
  const removeIngredient = (item) => {
    setSelected(selected.filter((el) => el !== item));
  };

  const removeAll = () => {
    setSelected([]);
  };
  return (
    selected.length > 0 && (
      <ul className={style.container}>
        {selected.map((el) => (
          <li className={style.item} key={uuidV4()}>
            {el}
            <Button
              view="cross"
              className={style.cross_btn}
              onClick={() => removeIngredient(el)}
            />
          </li>
        ))}
        <div className={style.remove_btn} onClick={removeAll}>
          <p>Очистить всё</p>
          <Button view="cross" className={style.cross_btn} />
        </div>
      </ul>
    )
  );
};

export default SelectedRecipeList;
