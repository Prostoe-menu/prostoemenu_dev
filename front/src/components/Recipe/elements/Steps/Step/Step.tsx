import { IStep } from 'shared/types/recipe';
import styles from './Step.module.scss';

type TStepProps = {
  item: IStep;
};

export const Step = ({ item }: TStepProps) => {
  const { image, description, step_number: stepNumber } = item;

  const apiImageUrl = import.meta.env.VITE_IMAGE_URL ?? '';

  return (
    <li className={image ? styles.stepWithImage : styles.step}>
      {image && <img src={apiImageUrl + image} className={styles.image} />}

      <div className={styles.descriptionWrapper}>
        <span className={styles.number}>{stepNumber}</span>
        <p className={styles.description}>{description}</p>
      </div>
    </li>
  );
};
