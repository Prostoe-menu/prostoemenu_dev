import React from 'react';
import RecipeBox from '../RecipeBox/RecipeBox';
import RecipeTitle from '../RecipeTitle/RecipeTitle';

import AdditionalInfo from '../AdditionalInfo/AdditionalInfo';

const StageFour = () => (
  <RecipeBox>
    <RecipeTitle>Дополнительная информация</RecipeTitle>
    <AdditionalInfo />
  </RecipeBox>
);

export default StageFour;
