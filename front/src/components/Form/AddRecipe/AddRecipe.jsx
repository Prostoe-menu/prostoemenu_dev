import React from 'react';
import Style from './AddRecipe.module.scss';

import PageTitle from '../PageTitle/PageTitle';
import RecipeBox from '../RecipeBox/RecipeBox';
// import RecipeTitle from '../RecipeTitle/RecipeTitle';
// import MainInfo from '../MainInfo/MainInfo';
import Ingredients from './Ingredients/Ingredients';

const AddRecipe = () => (
  <main className={Style.content}>
    <PageTitle>Добавить новый рецепт</PageTitle>
    <RecipeBox>
      {/* <RecipeTitle>Основная информация *</RecipeTitle> */}
      {/* <MainInfo /> */}
      <Ingredients />
    </RecipeBox>
  </main>
);

export default AddRecipe;
