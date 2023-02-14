import React from 'react';
import Style from './AddRecipe.module.scss';
import PageTitle from '../PageTitle/PageTitle';

const AddRecipe = () => (
  <main className={Style.content}>
    <PageTitle>Добавить новый рецепт</PageTitle>
  </main>
);

export default AddRecipe;
