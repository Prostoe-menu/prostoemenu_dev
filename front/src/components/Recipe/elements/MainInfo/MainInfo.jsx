import { CookingTime, OvenTime } from 'ui';
import StarRating from 'ui/StarRating';
import styles from './MainInfo.module.scss';

export const MainInfo = ({ recipe }) => {
  const {
    title,
    description,
    complexity,
    cover_path: imgUrl,
    cooking_time: cookingTime,
    oven_time: ovenTime,
  } = recipe;

  const apiImageUrl = import.meta.env.VITE_IMAGE_URL;

  return (
    <section className={styles.mainInfo}>
      {imgUrl ? (
        <img src={apiImageUrl + imgUrl} className={styles.img} alt={title} />
      ) : (
        <div className={styles.defaultImg}>No Image</div>
      )}
      <div className={styles.description}>
        <h3 className={styles.title}>{title}</h3>

        <p className={styles.params}>
          <StarRating label="Сложность" rating={parseInt(complexity)} />
          <CookingTime minutes={cookingTime} />
          <OvenTime minutes={ovenTime} />
        </p>
        {description}
      </div>
    </section>
  );
};
