/* eslint-disable */
import React from 'react';
import style from './SelectedRecipeList.module.scss';
import CloseButton from '../UI/CloseButton/CloseButton';
import { v4 as uuidV4 } from 'uuid';

const SelectedRecipeList = ({ selected, setSelected }) => {
  const removeIngredient = (item) => {
    setSelected(selected.filter((el) => el !== item));
  };

  const removeAll = () => {
    setSelected([]);
  };
  return (
    <div>
      {selected.length !== 0 ? (
        <ul className={style.container}>
          {selected.map((el) => (
            <li className={style.item} key={uuidV4()}>
              {el}{' '}
              <div
                className={style.remove_btn}
                onClick={() => removeIngredient(el)}
              >
                <CloseButton />
              </div>
            </li>
          ))}

          <div className={style.remove_btn_all} onClick={removeAll}>
            <p>Очистить всё</p>
            <CloseButton />
          </div>
        </ul>
      ) : (
        ''
      )}
    </div>
  );
};

export default SelectedRecipeList;
