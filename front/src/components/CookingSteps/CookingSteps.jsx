import React, { useState } from 'react';

import CookingStep from '../CookingStep/CookingStep';
import Button from '../Button/Button';

import { buttons } from '../../utils/constants';

import styles from './CookingSteps.module.scss';
import addIcon from '../../images/add.svg';

const CookingSteps = () => {
  const [initialStepsCount, setInitialStepsCount] = useState(2);

  const handleClickAddStepBtn = () => {
    setInitialStepsCount((state) => state + 1);
  };

  return (
    <div className={styles.steps}>
      <ul className={styles.steps__list}>
        {[...Array(initialStepsCount)].map((_, i) => (
          <li className={styles.steps__item}>
            <CookingStep stepNumber={i + 1} />
          </li>
        ))}
      </ul>
      <Button
        btnClassName={buttons.withBorder.grey}
        ariaLabelText="Добавить еще один шаг"
        onClickBtn={handleClickAddStepBtn}
      >
        <img src={addIcon} alt="Плюсик" />
        Добавить шаг
      </Button>
    </div>
  );
};

export default CookingSteps;
