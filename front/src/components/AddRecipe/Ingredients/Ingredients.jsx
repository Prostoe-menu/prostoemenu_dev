import React from 'react';
import Style from './Ingredients.module.scss';
import Ingredient from './Ingredient/Ingredient';
import RecipeTitle from '../../RecipeTitle/RecipeTitle';
import Button from '../../Button/Button';
import addIcon from '../../../img/add.svg';

const Ingredients = () => (
  <section className={Style.content}>
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
    <div className={Style.ingredientsContainer}>
      <Ingredient />
    </div>
    <Button
      btnClassName="button_border_grey"
      isSubmit={false}
      isDisabled={false}
      // onClickBtn,
      ariaLabelText="Добавить ингредиент"
    >
      <img className={Style.icon} src={addIcon} alt="Иконка 'плюсик'" />
      Добавить ингредиент
    </Button>
  </section>
);

export default Ingredients;
