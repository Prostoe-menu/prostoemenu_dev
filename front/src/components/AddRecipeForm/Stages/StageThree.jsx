import React from 'react';
import RecipeBox from '../RecipeBox/RecipeBox';
import RecipeTitle from '../RecipeTitle/RecipeTitle';
import CookingSteps from '../CookingSteps/CookingSteps';

const StageThree = () => (
  <RecipeBox>
    <RecipeTitle>Этапы готовки</RecipeTitle>
    <CookingSteps />
  </RecipeBox>
);

export default StageThree;
