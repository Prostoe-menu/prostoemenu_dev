import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import CloseButton from 'components/UI/CloseButton/CloseButton';
import InputsContainer from 'components/AddRecipeForm/Ingredients/Ingredient/InputsContainer/InputsContainer';
import { deleteIngredient } from 'store/slices/form/formSlice';
import Style from './Ingredient.module.scss';

const Ingredient = ({
  index,
  register,
  hideButton,
  ingredientData,
  measureUnits,
  error,
  name,
}) => {
  const dispatch = useDispatch();

  const deleteInputElement = useCallback(() => {
    dispatch(deleteIngredient(ingredientData.elementID));
  }, []);

  return (
    <div className={Style.content}>
      <div className={Style.ingredient}>
        <InputsContainer
          index={index}
          register={register}
          measureUnits={measureUnits}
          ingredientData={ingredientData}
          elementID={ingredientData.elementID}
          error={error}
          name={name}
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
