import { ChangeEvent, useState } from 'react';
import PhotoButton from 'ui/PhotoButton';
import styles from './CookingStep.module.scss';

type TCookingStepProps = {
  stepNumber: number;
};

const CookingStep = ({ stepNumber }: TCookingStepProps) => {
  const [stepText, setStepText] = useState('');

  const handleChangeStepDescription = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setStepText(event.target.value);
  };

  const loadHandler = () => {};

  return (
    <div className={styles.step}>
      <h3 className={styles.step__title}>Шаг {stepNumber}</h3>
      <fieldset className={styles.step__fieldset}>
        <div className={styles.step__photo}>
          <PhotoButton loadHandler={loadHandler} />
        </div>
        <div className={styles.step__description}>
          <textarea
            className={styles.step__input}
            placeholder="Описание шага"
            value={stepText}
            onChange={handleChangeStepDescription}
            maxLength={500}
          />
          <div className={styles['step__letters-counter']}>
            <span>{stepText.length}</span>
            <span>/500</span>
          </div>
        </div>
        <button
          className={styles['step__remove-btn']}
          type="button"
          aria-label="Удалить шаг"
        />
      </fieldset>
    </div>
  );
};

export default CookingStep;
