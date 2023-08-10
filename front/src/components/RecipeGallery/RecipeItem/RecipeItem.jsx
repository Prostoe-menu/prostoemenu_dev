import React from 'react';

import styles from './RecipeItem.module.css';

const RecipeItem = ({ recipe }) => {


  return (
    <div className={styles.wrapper}>
      <div>
        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
        <img
          src="https://pixfeeds.com/images/recipes/pork/1280-611764860-potato-stew-with-pork-and-mushrooms.jpg"
          alt="image"
          className={styles.imageContainer}
        />
        <h3 className={styles.name}>{recipe.name}</h3>
      </div>
    </div>
  );
};
export default RecipeItem;
