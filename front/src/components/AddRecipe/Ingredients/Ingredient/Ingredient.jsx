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
  </div>
);

export default Ingredient;
