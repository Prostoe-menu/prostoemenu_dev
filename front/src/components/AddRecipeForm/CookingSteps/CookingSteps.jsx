import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';
import addIcon from 'assets/images/add.svg';
import CookingStep from 'components/AddRecipeForm/CookingSteps/CookingStep/CookingStep';
import Button from 'components/UI/Button/Button';
import { changeCurrentStage } from 'store/slices/form/formSlice';
import styles from './CookingSteps.module.scss';

// Компонент будет доработан после утверждения окончательного дизайна

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
            <li className={styles.steps__item} key={uuidV4()}>
              <CookingStep stepNumber={i + 1} />
            </li>
          ))}
        </ul>
        <Button
          view="tertiary"
          aria-label="Добавить еще один шаг"
          onClick={handleClickAddStepBtn}
          className={styles.button_tertiary}
        >
          <img src={addIcon} alt="Плюсик" />
          Добавить шаг
        </Button>
      </div>
      <div className={styles.controls}>
        <Button view="secondary" onClick={onGoBack} className={styles.button}>
          Назад
        </Button>
        <Button type="submit" className={styles.button}>
          Далее
        </Button>
      </div>
    </form>
  );
};

export default CookingSteps;
