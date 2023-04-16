import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import CookingStep from '../CookingStep/CookingStep';
import Button from '../../UI/Button/Button';
import { changeCurrentStage } from '../../../store/slices/form/formSlice';
import { buttons } from '../../../utils/constants';

import styles from './CookingSteps.module.scss';
import addIcon from '../../../images/add.svg';
import arrowRight from '../../../images/arrow-right.svg';
import arrowLeft from '../../../images/arrow-left.svg';

const CookingSteps = () => {
  const [initialStepsCount, setInitialStepsCount] = useState(2);

  const handleClickAddStepBtn = () => {
    setInitialStepsCount((state) => state + 1);
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(saveGeneralRecipeInfo(data));
    dispatch(changeCurrentStage(4));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const onGoBack = () => {
    dispatch(changeCurrentStage(2));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <div className={styles.controls}>
        <Button
          btnClassName={buttons.withBorder.yellow}
          isSubmit={false}
          onClickBtn={onGoBack}
        >
          <img src={arrowLeft} alt="стрелка влево" /> назад
        </Button>
        <Button btnClassName={buttons.withBorder.yellow} isSubmit>
          далее <img src={arrowRight} alt="стрелка вправо" />
        </Button>
      </div>
    </form>
  );
};

export default CookingSteps;
