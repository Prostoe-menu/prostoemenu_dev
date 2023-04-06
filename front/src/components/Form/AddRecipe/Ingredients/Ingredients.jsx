import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import Style from './Ingredients.module.scss';
import Ingredient from './Ingredient/Ingredient';
import RecipeTitle from '../../RecipeTitle/RecipeTitle';
import Button from '../../../UI/Button/Button';
import addIcon from '../../../../images/add.svg';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([{ ingredient: '' }]);
  const addIngredient = () => {
    setIngredients([...ingredients, { id: uuidV4() }]);
  };
  const deleteIngredient = (id) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };
  return (
    <section className={Style.ingredients}>
      <RecipeTitle>Ингредиенты*</RecipeTitle>
      <div className={Style.textContainer}>
        <p className={Style.text}>
          Добавьте ингредиенты для вашего блюда, укажите их количество.
        </p>
      </div>
      <ul className={Style.ingredients__list}>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            <Ingredient
              hideButton={ingredients.length <= 1}
              deleteIngredient={() => deleteIngredient(ingredient.id)}
            />
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
