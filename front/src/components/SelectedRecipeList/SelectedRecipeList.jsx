import React from 'react';
import { v4 as uuidV4 } from 'uuid';
import CloseButton from 'components/UI/CloseButton/CloseButton';
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
            <CloseButton onClose={() => removeIngredient(el)} />
          </li>
        ))}
        {/* eslint-disable-next-line */}
        <div className={style.remove_btn} onClick={removeAll}>
          <p>Очистить всё</p>
          <CloseButton />
        </div>
      </ul>
    )
  );
};

export default SelectedRecipeList;
