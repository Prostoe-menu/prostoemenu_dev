import React from 'react';
import styles from './recipeBox.module.scss';

const RecipeBox = ({ children }) => (
  <div className={styles.box}>{children}</div>
);

export default RecipeBox;
