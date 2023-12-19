import React from 'react';
import RecipeGallery from 'components/RecipeGallery/RecipeGallery';
import RecipeSelection from 'components/RecipeSelection/RecipeSelection';

const HomePage = () => (
  <>
    <RecipeSelection />
    <RecipeGallery />;
  </>
);

export default HomePage;
