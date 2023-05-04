import React from 'react';
import RecipeBox from '../RecipeBox/RecipeBox';
import RecipeTitle from '../RecipeTitle/RecipeTitle';
import MainInfo from '../MainInfo/MainInfo';

const StageOne = () => (
  <RecipeBox>
    <RecipeTitle>Основная информация</RecipeTitle>
    <MainInfo />
  </RecipeBox>
);

export default StageOne;
