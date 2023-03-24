import React, { useState } from 'react';
import CloseButton from '../../../CloseButton/CloseButton';
import Style from './Ingredient.module.scss';
import InputsContainer from './InputsContainer/InputsContainer';

const Ingredient = ({ numIngredients, deleteIngredient }) => {
  const [isSubstituteHidden, setIsSubstituteHidden] = useState(true);
  const showSubstitute = () => {
    setIsSubstituteHidden(!isSubstituteHidden);
  };
  return (
    <div className={Style.content}>
      <div className={Style.ingredient}>
        <InputsContainer />
        <CloseButton
          numIngredients={numIngredients}
          ariaLabelText="Удалить ингредиент"
          onClose={deleteIngredient}
        />
      </div>
      <button
        className={`${Style.button} ${
          !isSubstituteHidden && Style.button_substitute
        }`}
        type="button"
        aria-label="Открыть поле для добавления варианта замены"
        onClick={showSubstitute}
      >
        Вариант замены
      </button>
      <InputsContainer isHidden={isSubstituteHidden} isSubstitute />
    </div>
  );
};

export default Ingredient;
