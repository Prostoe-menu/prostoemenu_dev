import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import CloseButton from '../../../../UI/CloseButton/CloseButton';
import InputsContainer from './InputsContainer/InputsContainer';
import { deleteIngredient } from '../../../../../store/slices/form/formSlice';
import Style from './Ingredient.module.scss';

const Ingredient = ({ hideButton, ingredientData }) => {
  const dispatch = useDispatch();

  const deleteInputElement = useCallback(() => {
    dispatch(deleteIngredient(ingredientData.elementID));
  }, []);

  return (
    <div className={Style.content}>
      <div className={Style.ingredient}>
        <InputsContainer
          ingredientData={ingredientData}
          elementID={ingredientData.elementID}
        />
        <CloseButton
          hideButton={hideButton}
          ariaLabelText="Удалить ингредиент"
          onClose={deleteInputElement}
        />
      </div>
    </div>
  );
};

export default memo(Ingredient);
