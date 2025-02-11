import CookingTime from 'ui/CookingTime';
import OvenTime from 'ui/OvenTime';
import StarRating from 'ui/StarRating';
import { IRecipe } from 'shared/types/recipe';
import styles from './MainInfo.module.scss';

type TMainInfoProps = {
  recipe: IRecipe;
};

export const MainInfo = ({ recipe }: TMainInfoProps) => {
  const {
    title,
    description,
    complexity,
    cover_path: imgUrl,
    cooking_time: cookingTime,
    oven_time: ovenTime,
  } = recipe;

  const apiImageUrl = import.meta.env.VITE_IMAGE_URL ?? '';

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
          <StarRating label="Сложность" rating={parseInt(String(complexity))} />
          <CookingTime minutes={cookingTime} />
          <OvenTime minutes={ovenTime} />
        </p>
        {description}
      </div>
    </section>
  );
};
