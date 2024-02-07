import StarRating from 'components/UI/StarRating';
import { timeFormat } from 'helpers/utils';
import styles from './RecipeCard.module.scss';

const RecipeCard = ({ recipe }) => {
  const {
    title,
    cooking_time: cookingTime,
    cover_path: imgUrl,
    complexity,
  } = recipe;

  return (
    <li>
      <article className={styles.recipe}>
        {imgUrl ? (
          <img src={imgUrl} className={styles.img} alt={name} />
        ) : (
          // TODO: временная заглушка отсутствующей картинки
          <div className={styles.defaultImg}>No Image</div>
        )}
        <div className={styles.description}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.complexity}>
            <StarRating label="Сложность" rating={parseInt(complexity)} />
          </p>
          <p className={styles.cookingTime}>{timeFormat(cookingTime)}</p>
        </div>
      </article>
    </li>
  );
};
export default RecipeCard;
