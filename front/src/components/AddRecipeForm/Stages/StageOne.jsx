import React from 'react';
import RecipeBox from 'components/AddRecipeForm/RecipeBox/RecipeBox';
import RecipeTitle from 'components/AddRecipeForm/RecipeTitle/RecipeTitle';
import MainInfo from 'components/AddRecipeForm/MainInfo/MainInfo';

const StageOne = () => (
  <RecipeBox>
    <RecipeTitle>Основная информация</RecipeTitle>
    <MainInfo />
  </RecipeBox>
);

export default StageOne;
