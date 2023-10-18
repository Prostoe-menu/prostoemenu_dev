import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import styles from './RecipeGallery.module.scss';
import fetchRecipes from '../../store/slices/recipe/recipeThunk';
import RecipeCard from './RecipeCard/RecipeCard';

const RecipeGallery = () => {
  const recipes = useSelector((state) => state.recipe.recipes);
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the fetchRecipes thunk to trigger the API call
    dispatch(fetchRecipes());
  }, [dispatch]);
  return (
    <div>
      <h2 className={styles.catalogTitle}>Каталог рецептов</h2>
      {recipes.length ? (
        <section className={styles.container}>
          {recipes.map((recipe, index) => (
            <RecipeCard
              /* eslint-disable-next-line react/no-array-index-key */
              key={index}
              className={styles.galleryItem}
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
