import React from 'react';
import Style from './Ingredient.module.scss';
import InputsContainer from './InputsContainer/InputsContainer';

const Ingredient = () => (
  <div className={Style.content}>
    <InputsContainer />
  </div>
);

export default Ingredient;
