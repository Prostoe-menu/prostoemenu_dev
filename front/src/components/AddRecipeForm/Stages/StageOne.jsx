import React from 'react';
import MainInfo from 'components/AddRecipeForm/MainInfo/MainInfo';
import RecipeBox from 'components/AddRecipeForm/RecipeBox/RecipeBox';
import RecipeTitle from 'components/AddRecipeForm/RecipeTitle/RecipeTitle';

const StageOne = () => (
  <RecipeBox>
    <RecipeTitle>Основная информация</RecipeTitle>
    <MainInfo />
  </RecipeBox>
);

export default StageOne;
