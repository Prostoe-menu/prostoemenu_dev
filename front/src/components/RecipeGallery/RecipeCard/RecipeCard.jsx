import React from 'react';
import styles from './RecipeCard.module.scss';

const RecipeCard = ({ recipe }) => (
  <div className={styles.cardWrapper}>
    <img
      // src="{recipe.image}"
      src="https://cdn.lifehacker.ru/wp-content/uploads/2018/09/7-klassnyx-sposobov-prigotovit-kartoshku-s-gribami-na-skovorode-i-v-duxovke_1537481399-640x320.jpg"
      className={styles.cardImage}
      // alt="{recipe.name}"
      alt="блюдо"
    />
    <div className={styles.cardDescriptionWrapper}>
      {/* <h3 className={styles.cardName}>{recipe.name}</h3> */}
      <h3 className={styles.cardName}>Тушёный картофель с курицей и грибами в чесночном соусе в мультиварке</h3>
      <div className={styles.cardDescription__item}>
        <p className={styles.cardDescription__text}>Сложность:</p>
        {/* здесь должен быть скрипт, добавляющий нужное количество звезд */}
        <div className={styles.complexityImage}></div>
        <div className={styles.complexityImage}></div>
        <div className={styles.complexityImage}></div>
      </div>
      <div className={styles.cardDescription__item}>
        <div className={styles.timerImage}></div>
        {/* <p className={styles.cardDescription__text}>{recipe.cookhours} час {recipe.cookminutes} мин.</p> */}
        <p className={styles.cardDescription__text}>1 час 30 мин.</p>
      </div>
    </div>
  </div>
);
export default RecipeCard;
