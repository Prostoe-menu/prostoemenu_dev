import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';

import fetchRecipes from '../../store/slices/recipe/recipeThunk';

const RecipeGallery = () => {
  const { results } = useSelector((state) => state.recipe.recipes);
  const dispatch = useDispatch();
  // const currentStage = useSelector((state) => state.form.currentFormStage);

  useEffect(() => {
    // Dispatch the fetchRecipes thunk to trigger the API call
    dispatch(fetchRecipes());
  }, [dispatch]);

  if (results) {
    return (
      <section>
        {results.map((recipe, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className="gallery-item" key={`${index}ght`}>
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>
            <img src={recipe.photos[0]?.photo} alt={recipe.name} />
          </div>
        ))}
      </section>
    );
  }
  return <div>Loading...</div>;
};
export default RecipeGallery;
