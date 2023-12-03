import React from 'react';
import styles from './RecipeCard.module.scss';

const RecipeCard = ({ recipe }) => {
  const { name, cooking_time: cookingTime, photos } = recipe;

  const imgUrl = photos[0]?.photo;

  return (
    <div className={styles.recipe}>
      {imgUrl && <img src={imgUrl} className={styles.img} alt={name} />}
      <div className={styles.description}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.complexity}>
          Сложность:
          <span className={styles.star} />
          <span className={styles.star} />
          <span className={styles.star} />
        </p>
        <p className={styles.cookingTime}>{cookingTime}</p>
      </div>
    </div>
  );
};
export default RecipeCard;
