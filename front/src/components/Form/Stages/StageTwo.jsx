import React from 'react';
import RecipeBox from '../RecipeBox/RecipeBox';
import RecipeTitle from '../RecipeTitle/RecipeTitle';
import MainInfo from '../MainInfo/MainInfo';

const StageTwo = () => (
  <RecipeBox>
    <RecipeTitle>Ингредиенты</RecipeTitle>
    <MainInfo />
  </RecipeBox>
);

export default StageTwo;
