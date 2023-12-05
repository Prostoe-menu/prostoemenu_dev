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
        <p className={styles.cardDescription__text}>Сложность:</p>
        {/* TO DO https://github.com/Prostoe-menu/prostoemenu_dev/issues/125 */}
        <div className={styles.complexityImage} />
        <div className={styles.complexityImage} />
        <div className={styles.complexityImage} />
      </div>
      <div className={styles.cardDescription__item}>
        <div className={styles.timerImage} />
        <p className={styles.cardDescription__text}>1 час 30 мин.</p>
      </div>
    </div>
  </div>
);
export default RecipeCard;
