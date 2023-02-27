import React from 'react';
import Style from './AddRecipe.module.scss';
import PageTitle from '../PageTitle/PageTitle';
import CookingSteps from '../CookingSteps/CookingSteps';

const AddRecipe = () => (
  <main className={Style.content}>
    <PageTitle>Добавить новый рецепт</PageTitle>
    <CookingSteps />
  </main>
);

export default AddRecipe;
