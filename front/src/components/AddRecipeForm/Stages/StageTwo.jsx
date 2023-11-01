import React from 'react';
import RecipeBox from 'components/AddRecipeForm/RecipeBox/RecipeBox';
import RecipeTitle from 'components/AddRecipeForm/RecipeTitle/RecipeTitle';
import Ingredients from 'components/AddRecipeForm/Ingredients/Ingredients';

const StageTwo = () => (
  <RecipeBox>
    <RecipeTitle>Ингредиенты</RecipeTitle>
    <Ingredients />
  </RecipeBox>
);

export default StageTwo;
