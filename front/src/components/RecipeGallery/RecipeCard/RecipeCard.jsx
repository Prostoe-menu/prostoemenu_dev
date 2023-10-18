import React from 'react';

import styles from './RecipeCard.module.scss';

const RecipeCard = ({ recipe }) => (
  <div className={styles.cardWrapper}>
    <div className={styles.card}>
      <img
        src="https://pixfeeds.com/images/recipes/pork/1280-611764860-potato-stew-with-pork-and-mushrooms.jpg"
        className={styles.cardImage}
        alt="блюдо"
      />
      <div className={styles.cardDescriptionWrapper}>
        {/* <h3 className={styles.cardName}>{recipe.name}</h3> */}
        <h3 className={styles.cardName}>Тушёный картофель с курицей и грибами в чесночном соусе в мультиварке</h3>
        <div className={styles.cardDescription__item}>
          <p className={styles.cardDescription__text}>Сложность</p>
          <img src="../../../images/star-filled.svg" alt="сложно" />
        </div>
        <div className={styles.cardDescription__item}>
          <img src="../../../images/timer.svg" alt="время готовки" />
          <p className={styles.cardDescription__text}>1 час 30 мин.</p>
        </div>
      </div>
    </div>
  </div>
);
export default RecipeCard;
