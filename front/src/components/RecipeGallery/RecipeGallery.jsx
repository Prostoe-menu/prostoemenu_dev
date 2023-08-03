import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import style from './RecipeGallery.module.css';
import fetchRecipes from '../../store/slices/recipe/recipeThunk';
import RecipeItem from './RecipeItem/RecipeItem';

const RecipeGallery = () => {
  const results = useSelector((state) => state.recipe.recipes);
  const dispatch = useDispatch();
  // const currentStage = useSelector((state) => state.form.currentFormStage);

  useEffect(() => {
    // Dispatch the fetchRecipes thunk to trigger the API call
    dispatch(fetchRecipes());
  }, [dispatch]);

  if (results) {
    return (
      <section className={style.container}>
        {results.map((recipe) => (
          // eslint-disable-next-line react/no-array-index-key
          <RecipeItem className={style.galleryItem} recipe={recipe} />
        ))}
      </section>
    );
  }
  return <div>Loading...</div>;
};
export default RecipeGallery;
