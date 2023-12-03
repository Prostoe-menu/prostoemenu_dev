import React from 'react';
import { v4 as uuidV4 } from 'uuid';
import RecipeCard from './RecipeCard/RecipeCard';
import styles from './RecipeList.module.scss';

const RecipeList = ({ title, recipes }) => (
  <>
    {title && <h2 className={styles.title}>{title}</h2>}

    {recipes.length && (
      <section className={styles.recipeList}>
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={uuidV4()} /> // заменить на recipe.id
        ))}
      </section>
    )}
  </>
);

export default RecipeList;
