import React from 'react';
import CloseButton from '../../../CloseButton/CloseButton';
import Style from './Ingredient.module.scss';
import InputsContainer from './InputsContainer/InputsContainer';

const Ingredient = () => (
  <div className={Style.content}>
    <div className={Style.ingredient}>
      <InputsContainer />
      <CloseButton ariaLabelText="Удалить ингредиент" />
    </div>
    <button
      type="button"
      aria-label="Открыть поле для добавления варианта замены"
      className={Style.button}
    >
      Вариант замены
    </button>
  </div>
);

export default Ingredient;
