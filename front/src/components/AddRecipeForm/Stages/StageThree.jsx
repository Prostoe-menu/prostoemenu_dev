import React from 'react';
import RecipeBox from 'components/AddRecipeForm/RecipeBox/RecipeBox';
import RecipeTitle from 'components/AddRecipeForm/RecipeTitle/RecipeTitle';
import CookingSteps from 'components/AddRecipeForm/CookingSteps/CookingSteps';

const StageThree = () => (
  <RecipeBox>
    <RecipeTitle>Этапы готовки</RecipeTitle>
    <CookingSteps />
  </RecipeBox>
);

export default StageThree;
