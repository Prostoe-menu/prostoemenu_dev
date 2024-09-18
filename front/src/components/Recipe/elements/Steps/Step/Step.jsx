import styles from './Step.module.scss';

export const Step = ({ item }) => {
  const { image, description, step_number: stepNumber } = item;

  const apiImageUrl = import.meta.env.VITE_IMAGE_URL;

  return (
    <li className={image ? styles.stepWithImage : styles.step}>
      <div className={styles.imageWrapper}>
        {image && <img src={apiImageUrl + image} className={styles.image} />}
      </div>

      <div className={styles.descriptionWrapper}>
        <span className={styles.number}>{stepNumber}</span>
        <p className={styles.description}>{description}</p>
      </div>
    </li>
  );
};
