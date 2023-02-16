import React from 'react';
import styles from './recipeTitle.module.scss';

const RecipeTitle = ({ children }) => (
  <h3 className={styles.title}>{children}</h3>
);

export default RecipeTitle;
