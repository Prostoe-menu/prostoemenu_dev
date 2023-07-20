import React from 'react';
import RecipeBox from '../RecipeBox/RecipeBox';
import RecipeTitle from '../RecipeTitle/RecipeTitle';
import Ingredients from '../Ingredients/Ingredients';

const StageTwo = () => (
  <RecipeBox>
    <RecipeTitle>Ингредиенты</RecipeTitle>
    <Ingredients />
  </RecipeBox>
);

export default StageTwo;
