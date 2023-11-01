import React from 'react';
import RecipeBox from 'components/AddRecipeForm/RecipeBox/RecipeBox';
import RecipeTitle from 'components/AddRecipeForm/RecipeTitle/RecipeTitle';
import AdditionalInfo from 'components/AddRecipeForm/AdditionalInfo/AdditionalInfo';

const StageFour = () => (
  <RecipeBox>
    <RecipeTitle>Дополнительная информация</RecipeTitle>
    <AdditionalInfo />
  </RecipeBox>
);

export default StageFour;
