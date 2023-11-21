import React from 'react';
import styles from './RecipeItem.module.scss';

const RecipeItem = ({ recipe }) => (
  <div className={styles.wrapper}>
    <div>
      <img
        src="https://pixfeeds.com/images/recipes/pork/1280-611764860-potato-stew-with-pork-and-mushrooms.jpg"
        className={styles.imageContainer}
        alt="блюдо"
      />
      <h3 className={styles.name}>{recipe.name}</h3>
    </div>
  </div>
);
export default RecipeItem;
