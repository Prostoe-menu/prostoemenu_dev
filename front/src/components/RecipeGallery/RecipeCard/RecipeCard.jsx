import React from 'react';
import StarRating from 'components/UI/StarRating';
import styles from './RecipeCard.module.scss';

const RecipeCard = () => (
  <div className={styles.card}>
    <img
      src="https://cdn.lifehacker.ru/wp-content/uploads/2018/09/7-klassnyx-sposobov-prigotovit-kartoshku-s-gribami-na-skovorode-i-v-duxovke_1537481399-640x320.jpg"
      className={styles.cardImage}
      alt="картофель тушеный с курицей и грибами"
    />
    <div className={styles.cardDescription}>
      <h3 className={styles.cardName}>
        Тушёный картофель с курицей и грибами в чесночном соусе в мультиварке
      </h3>
      <div className={styles.cardDescription__item}>
        <StarRating label="Сложность" amount={2} />
      </div>
      <div className={styles.cardDescription__item}>
        <div className={styles.timerImage} /> 1 час 30 мин.
      </div>
    </div>
  </div>
);
export default RecipeCard;
