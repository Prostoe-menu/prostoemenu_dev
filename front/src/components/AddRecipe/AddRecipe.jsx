import React from 'react';
import Style from './AddRecipe.module.scss';
import PageTitle from '../PageTitle/PageTitle';
import Ingredients from './Ingredients/Ingredients';

const AddRecipe = () => (
  <main className={Style.content}>
    <PageTitle>Добавить новый рецепт</PageTitle>
    <Ingredients />
  </main>
);

export default AddRecipe;
