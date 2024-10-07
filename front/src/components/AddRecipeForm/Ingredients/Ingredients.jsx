import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';
import Ingredient from 'components/AddRecipeForm/Ingredients/Ingredient/Ingredient';
import {
  addEmptyIngredient,
  nextStep,
  prevStep,
  saveAllIngredients,
} from 'store/slices/form/formSlice';
import { addNotification } from 'store/slices/toast/toastSlice';
// import RecipeTitle from 'components/AddRecipeForm/RecipeTitle/RecipeTitle';
import Button from 'ui/Button';
import getMeasurements from 'helpers/getMeasurements';
import { defaultMeasureUnits } from 'utils/constants';
import addIcon from 'assets/images/add.svg';
import styles from './Ingredients.module.scss';

// Компонент будет доработан после утверждения окончательного дизайна

const Ingredients = () => {
  const { ingredients } = useSelector((state) => state.form);
  const { register, handleSubmit } = useForm({ values: ingredients });
  const dispatch = useDispatch();
  const [measureUnits, setMeasureUnits] = useState([]);
  const [errorType, setErrorType] = useState('');
  const [errorRefName, setErrorRefName] = useState('');

  const onSubmit = () => {
    dispatch(saveAllIngredients());
    dispatch(nextStep());
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const onError = (errors) => {
    if (errors.ingredient) {
      errors.ingredient.forEach((item) => {
        if ('name' in item) {
          setErrorType('name');

          if (item.name.type === 'required' || item.name.type === 'pattern') {
            dispatch(addNotification(item.name.message));
          }
          setErrorRefName(item.name.ref.name);
        } else if ('quantity' in item) {
          setErrorType('quantity');

          if (
            item.quantity.type === 'required' ||
            item.quantity.type === 'min'
          ) {
            dispatch(addNotification(item.quantity.message));
          }
          setErrorRefName(item.quantity.ref.name);
        }
      });
    } else {
      setErrorType('other');
      dispatch(addNotification('Что-то пошло не так'));
    }
  };

  const onGoBack = () => {
    dispatch(prevStep());
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const addEmptyInput = () => {
    dispatch(addEmptyIngredient());
  };

  useEffect(() => {
    getMeasurements()
      .then((data) => {
        const mappedData = data.map((item) => ({
          id: uuidV4(),
          name: item.abbreviation,
        }));

        return setMeasureUnits(mappedData);
      })
      // fallback case
      .catch(() => setMeasureUnits(defaultMeasureUnits));
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <section className={styles.ingredients}>
        {/* <RecipeTitle>
        <span className={styles.mobileTitle}>2. </span>Ингредиенты*
      </RecipeTitle> */}
        <div className={styles.textContainer}>
          <p className={styles.text}>
            Добавьте ингредиенты для вашего блюда, укажите их количество.
          </p>
        </div>
        <ul className={styles.list}>
          {ingredients.map((ingredient, index) => (
            <li key={ingredient.elementID}>
              <Ingredient
                index={index}
                register={register}
                measureUnits={measureUnits}
                ingredientData={ingredient}
                hideButton={ingredients.length <= 1}
                error={errorType}
                name={errorRefName}
              />
            </li>
          ))}
        </ul>
        <Button
          view="tertiary"
          className={styles.button_tertiary}
          disabled={ingredients.length >= 20}
          onClick={addEmptyInput}
          aria-label="Добавить ингредиент"
        >
          <img className={styles.icon} src={addIcon} alt="Иконка 'плюсик'" />
          Добавить ингредиент
        </Button>
      </section>
      <div className={styles.controls}>
        <Button view="secondary" onClick={onGoBack} className={styles.button}>
          Назад
        </Button>
        <Button type="submit" className={styles.button}>
          Далее
        </Button>
      </div>
    </form>
  );
};

export default Ingredients;
