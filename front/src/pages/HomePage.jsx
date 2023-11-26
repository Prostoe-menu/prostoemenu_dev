import React from 'react';
import RecipeSelection from 'components/RecipeSelection/RecipeSelection';
import RecipeGallery from '../components/RecipeGallery/RecipeGallery';

const HomePage = () => (
  <>
    <RecipeSelection />
    <RecipeGallery />;
  </>
);

export default HomePage;
