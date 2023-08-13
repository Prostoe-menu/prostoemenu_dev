import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import style from './RecipeGallery.module.scss';
import fetchRecipes from '../../store/slices/recipe/recipeThunk';
import RecipeItem from './RecipeItem/RecipeItem';

const RecipeGallery = () => {
  const recipes = useSelector((state) => state.recipe.recipes);
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the fetchRecipes thunk to trigger the API call
    dispatch(fetchRecipes());
  }, [dispatch]);
  return (
    <div>
      {recipes.length ? (
        <section className={style.container}>
          {recipes.map((recipe, index) => (
            <RecipeItem
              /* eslint-disable-next-line react/no-array-index-key */
              key={index}
              className={style.galleryItem}
              recipe={recipe}
            />
          ))}
        </section>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default RecipeGallery;
