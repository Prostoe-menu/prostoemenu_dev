import { CookingTime, OvenTime } from 'components/UI';
import StarRating from 'components/UI/StarRating';
import { checkImage } from 'helpers/checkImage';
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

  return (
    <section className={styles.mainInfo}>
      {checkImage(imgUrl) ? (
        <img src={imgUrl} className={styles.img} alt={title} />
      ) : (
        // TODO: временная заглушка отсутствующей картинки
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
