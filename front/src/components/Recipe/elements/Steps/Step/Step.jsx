import { checkImage } from 'helpers/checkImage';
import styles from './Step.module.scss';

export const Step = ({ item }) => {
  const { image, description, step_number: stepNumber } = item;

  const hasImage = checkImage(image);

  return (
    <li className={hasImage ? styles.stepWithImage : styles.step}>
      <div className={styles.imageWrapper}>
        {hasImage && <img src={image} className={styles.image} />}
      </div>

      <div className={styles.descriptionWrapper}>
        <span className={styles.number}>{stepNumber}</span>
        <p className={styles.description}>{description}</p>
      </div>
    </li>
  );
};
