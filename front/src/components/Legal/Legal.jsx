/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import styles from './Legal.module.scss';

const Legal = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClickCheckbox = () => {
    setIsChecked((state) => !state);
  };

  return (
    <div className={styles.legal}>
      {
        // TODO: Заменить тег h3 на компонент RecipeTitle
      }
      <h3 className={styles.legal__title}>Почти готово :)</h3>
      <label className={styles.legal__email} htmlFor="email">
        Укажите вашу электронную почту, так мы сможем сообщить вам, когда ваш
        рецепт будет опубликован.
      </label>
      <input
        className={styles.legal__input}
        type="email"
        name="email"
        id="email"
        placeholder="Электронная почта*"
      />
      <label htmlFor="agreement" className={styles.legal__agreement}>
        <input
          className={styles.legal__input_hide}
          type="checkbox"
          name="agreement"
          id="agreement"
          checked={isChecked}
          disabled={isDisabled}
        />
        <div
          className={styles.legal__checkbox}
          onClick={() => !isDisabled && handleClickCheckbox()}
        />
        Согласен(на) с политикой конфиденциальности
      </label>
    </div>
  );
};

export default Legal;
