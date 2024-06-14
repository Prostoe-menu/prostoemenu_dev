import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import InputsContainer from 'components/AddRecipeForm/Ingredients/Ingredient/InputsContainer/InputsContainer';
import { deleteIngredient } from 'store/slices/form/formSlice';
import Button from 'ui/Button';
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
  }, [dispatch, ingredientData.elementID]);

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
        <Button
          view="cross"
          isHidden={hideButton}
          className={styles.button}
          aria-label="Удалить ингредиент"
          onClick={deleteInputElement}
        />
      </div>
    </div>
  );
};

export default memo(Ingredient);
