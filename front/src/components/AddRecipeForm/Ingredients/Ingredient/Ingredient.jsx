import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import CloseButton from '../../../UI/CloseButton/CloseButton';
import InputsContainer from './InputsContainer/InputsContainer';
import { deleteIngredient } from '../../../../store/slices/form/formSlice';
import styles from './Ingredient.module.scss';

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
    <div className={styles.content}>
      <div className={styles.ingredient}>
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
          isHidden={hideButton}
          ariaLabelText="Удалить ингредиент"
          onClose={deleteInputElement}
        />
      </div>
    </div>
  );
};

export default memo(Ingredient);
