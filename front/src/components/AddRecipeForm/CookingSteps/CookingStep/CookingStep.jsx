import { useState } from 'react';
import PhotoButton from 'ui/PhotoButton/PhotoButton';
import styles from './CookingStep.module.scss';

const CookingStep = ({ stepNumber }) => {
  const [stepText, setStepText] = useState('');

  const handleChangeStepDescription = (evt) => {
    setStepText(evt.target.value);
  };

  return (
    <div className={styles.step}>
      <h3 className={styles.step__title}>Шаг {stepNumber}</h3>
      <fieldset className={styles.step__fieldset}>
        <div className={styles.step__photo}>
          <PhotoButton />
        </div>
        <div className={styles.step__description}>
          <textarea
            className={styles.step__input}
            type="text"
            placeholder="Описание шага"
            value={stepText}
            onChange={(evt) => handleChangeStepDescription(evt)}
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
