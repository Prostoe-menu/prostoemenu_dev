import { Link } from 'react-router-dom';
import StarRating from 'ui/StarRating';
import { timeFormat } from 'helpers/utils';
import styles from './RecipeCard.module.scss';

const RecipeCard = ({ recipe }) => {
  const {
    id,
    title,
    cooking_time: cookingTime,
    cover_path: imgUrl,
    complexity,
  } = recipe;

//  const apiImageUrl = import.meta.env.VITE_IMAGE_URL;

  return (
    <li>
      <article className={styles.recipe}>
        {imgUrl ? (
          <img src={imgUrl} className={styles.img} alt={title} />
        ) : (
          <div className={styles.defaultImg}>No Image</div>
        )}
        <div className={styles.description}>
          <h3 className={styles.title}>
            <Link to={`/recipe/${id}`} className={styles.link}>
              {title}
            </Link>
          </h3>
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
