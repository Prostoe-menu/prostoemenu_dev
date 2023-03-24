import React, { useState } from 'react';
import Style from './Ingredients.module.scss';
import Ingredient from './Ingredient/Ingredient';
import RecipeTitle from '../../RecipeTitle/RecipeTitle';
import Button from '../../Button/Button';
import addIcon from '../../../images/add.svg';

const Ingredients = () => {
  const [numIngredients, setNumIngredients] = useState(1);
  const addIngredient = () => setNumIngredients(numIngredients + 1);
  const deleteIngredient = () => setNumIngredients(numIngredients - 1);
  return (
    <section className={Style.ingredients}>
      <RecipeTitle>Ингредиенты*</RecipeTitle>
      <div className={Style.textContainer}>
        <p className={Style.text}>
          Добавьте ингредиенты для вашего блюда, укажите их количество.
        </p>
        <p className={Style.text}>
          Если ингредиент можно заменить другим, укажите это в поле «Вариант
          замены».
        </p>
      </div>
      <ul className={Style.ingredients__list}>
        {Array.from({ length: numIngredients }).map(() => (
          <li>
            <Ingredient deleteIngredient={deleteIngredient} />
          </li>
        ))}
      </ul>
      <Button
        btnClassName="button_border_grey"
        isSubmit={false}
        isDisabled={false}
        onClickBtn={addIngredient}
        ariaLabelText="Добавить ингредиент"
      >
        <img className={Style.icon} src={addIcon} alt="Иконка 'плюсик'" />
        Добавить ингредиент
      </Button>
    </section>
  );
};

export default Ingredients;
