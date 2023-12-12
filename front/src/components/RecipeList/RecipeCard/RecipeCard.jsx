import StarRating from 'components/UI/StarRating';
import { timeFormat } from 'helpers/utils';
import styles from './RecipeCard.module.scss';

const RecipeCard = ({ recipe }) => {
  const { name, cooking_time: cookingTime, photos, complexity } = recipe;

  const imgUrl = photos && photos[0]?.photo;

  return (
    <div className={styles.recipe}>
      {imgUrl && <img src={imgUrl} className={styles.img} alt={name} />}
      <div className={styles.description}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.complexity}>
          <StarRating label="Сложность" rating={parseInt(complexity)} />
        </p>
        <p className={styles.cookingTime}>{timeFormat(cookingTime)}</p>
      </div>
    </div>
  );
};
export default RecipeCard;
