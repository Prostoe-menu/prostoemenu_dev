import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchRecipes from 'store/slices/recipe/recipeThunk';
import RecipeCard from './RecipeCard/RecipeCard';
import styles from './RecipeGallery.module.scss';

const RecipeGallery = () => {
  const recipes = useSelector((state) => state.recipe.recipes);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Каталог рецептов</h2>
      <div>
        {recipes.length ? (
          <section className={styles.catalogContainer}>
            {recipes.map((recipe) => (
              <RecipeCard className={styles.galleryItem} recipe={recipe} />
            ))}
          </section>
        ) : (
          <div className={styles.loading}>
            Пожалуйста, подождите, выполняется загрузка...
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeGallery;
