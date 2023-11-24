import React from 'react';
import AdditionalInfo from 'components/AddRecipeForm/AdditionalInfo/AdditionalInfo';
import RecipeBox from 'components/AddRecipeForm/RecipeBox/RecipeBox';
import RecipeTitle from 'components/AddRecipeForm/RecipeTitle/RecipeTitle';

const StageFour = () => (
  <RecipeBox>
    <RecipeTitle>Дополнительная информация</RecipeTitle>
    <AdditionalInfo />
  </RecipeBox>
);

export default StageFour;
