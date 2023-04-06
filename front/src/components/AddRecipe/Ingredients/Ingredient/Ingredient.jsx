import React from 'react';
import CloseButton from '../../../CloseButton/CloseButton';
import Style from './Ingredient.module.scss';
import InputsContainer from './InputsContainer/InputsContainer';

const Ingredient = ({ hideButton, deleteIngredient }) => (
  <div className={Style.content}>
    <div className={Style.ingredient}>
      <InputsContainer />
      <CloseButton
        hideButton={hideButton}
        ariaLabelText="Удалить ингредиент"
        onClose={deleteIngredient}
      />
    </div>
  </div>
);

export default Ingredient;
