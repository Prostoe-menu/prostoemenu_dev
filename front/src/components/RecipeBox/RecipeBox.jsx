import React from 'react';
import styles from './recipeBox.module.scss';

const RecipeBox = ({ children }) => (
  <section className={styles.box}>{children}</section>
);

export default RecipeBox;
