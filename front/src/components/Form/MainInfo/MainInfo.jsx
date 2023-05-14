/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '../Tooltip/Tooltip';
import TooltipDifficultyContent from '../Tooltip/TooltipDifficultyContent/TooltipDifficultyContent';
import PhotoButton from '../../UI/PhotoButton/PhotoButton';
import Button from '../../UI/Button/Button';
import {
  changeCurrentStage,
  saveGeneralRecipeInfo,
} from '../../../store/slices/form/formSlice';
import styles from './mainInfo.module.scss';
import { buttons } from '../../../utils/constants';
import arrowRight from '../../../images/arrow-right.svg';

const MainInfo = () => {
  const [nameCounter, setNameCounter] = useState(0);
  const [descCounter, setDescCounter] = useState(0);
  const [portion, setPortion] = useState(0);

  const dispatch = useDispatch();
  const { recipeName } = useSelector((state) => state.form);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { recipeName },
  });
  // eslint-disable-next-line
  const onSubmit = (data) => {
    dispatch(saveGeneralRecipeInfo(data));
    dispatch(changeCurrentStage(2));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  function nameChange(event) {
    setNameCounter(event.target.value.length);
  }

  function descChange(event) {
    setDescCounter(event.target.value.length);
  }

  function incrementPortion() {
    setPortion(portion + 1);
  }

  function decrementPortion() {
    setPortion(portion - 1);
  }

  return (
    <form className={styles.mainInfo} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h3 className={styles.title}>Название рецепта</h3>
        <div className={styles.wrap}>
          <input
            {...register('recipeName', {
              required: true,
              minLength: 2,
              maxLength: 100,
              pattern: /^[а-яА-Яa-zA-Z-_ ]+$/,
            })}
            className={styles.name_input}
            onChange={nameChange}
            type="text"
            // name="recipe"
            // id="recipe"
            placeholder="Название вашего блюда"
            // minLength="2"
            maxLength="100"
            // pattern="^[а-яА-Яa-zA-Z-_ ]+$"
            data-error-message="Разрешены только латинские буквы, кириллические буквы, знаки дефиса и пробелы."
            // required
          />
          {errors?.recipe?.type === 'required' && <p>This field is required</p>}
          {errors?.recipe?.type === 'maxLength' && (
            <p>First name cannot exceed 20 characters</p>
          )}
          {errors?.recipe?.type === 'pattern' && (
            <p>Alphabetical characters only</p>
          )}
          <p className={styles.counter}>{nameCounter} / 100</p>
        </div>
      </div>
      <div className={styles.wrap_complexity}>
        <div className={styles.complexity}>
          <div className={styles.tooltipContainer}>
            <p className={styles.title}>Сложность</p>
            <Tooltip
              toolTipContent={<TooltipDifficultyContent />}
              width="129px"
            />
          </div>
          <ul className={styles.stars}>
            <li className={styles.star} />
            <li className={styles.star} />
            <li className={styles.star} />
          </ul>
        </div>
        <div>
          <p className={styles.title}>Количество порций</p>
          <div className={styles.wrap_counter}>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonMinus}`}
              onClick={decrementPortion}
              disabled={portion === 0 && true}
              aria-label="Минус"
            >
              {' '}
            </button>
            <p
              className={
                portion === 0
                  ? styles.portion
                  : `${styles.portion} ${styles.portion_active}`
              }
            >
              {portion}
            </p>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonPlus}`}
              onClick={incrementPortion}
              aria-label="Плюс"
            >
              {' '}
            </button>
          </div>
        </div>
      </div>
      <div>
        <p className={styles.title}>Время приготовления</p>
        <div className={styles.wrap_count}>
          <div className={styles.wrap_totalTime}>
            <h4 className={styles.totalTime}>Всего</h4>
            <label htmlFor="allhours" className={styles.label}>
              <input
                {...register('allhours', { required: true, pattern: /[0-23]/ })}
                type="text"
                id="allhours"
                placeholder="0"
                // pattern="[0-23]"
                className={styles.time}
              />
              &nbsp;час(ов)
            </label>
            <label htmlFor="allminutes" className={styles.label}>
              <input
                type="text"
                id="allminutes"
                placeholder="0"
                pattern="[0-59]"
                className={styles.time}
              />
              &nbsp;минут
            </label>
          </div>
          <div className={styles.wrap_cookTime}>
            <div className={styles.tooltipContainer}>
              <p className={styles.cookTime}>Время &quot;У плиты&quot;</p>
              <Tooltip
                toolTipContent="Время активной готовки блюда без учёта того, сколько оно варится, жарится, запекается и т.д."
                width="173px"
              />
            </div>
            <label htmlFor="cookhours" className={styles.label}>
              <input
                type="text"
                id="cookhours"
                placeholder="0"
                pattern="[0-23]"
                className={styles.time}
              />
              &nbsp;час(ов)
            </label>
            <label htmlFor="cookminutes" className={styles.label}>
              <input
                type="text"
                id="cookminutes"
                placeholder="0"
                pattern="[0-59]"
                className={styles.time}
              />
              &nbsp;минут
            </label>
          </div>
        </div>
      </div>
      <div>
        <p className={styles.title}>Описание</p>
        <div className={styles.wrap_description}>
          <p className={styles.description}>
            Кратко расскажите о вашем рецепте.
          </p>
          <p className={styles.description}>
            Например, какой у него вкус, особенности, или как вы о нём узнали.
          </p>
        </div>
        <div className={styles.descinput_wrap}>
          <textarea
            className={styles.desc_input}
            onChange={descChange}
            name="recipedesc"
            id="recipedesc"
            placeholder="Описание рецепта"
            minLength="2"
            maxLength="500"
            pattern="^[а-яА-Яa-zA-Z-_ ]+$"
            data-error-message="Разрешены только латинские буквы, кириллические буквы, знаки дефиса и пробелы."
            required
          />
          <p className={`${styles.counter} ${styles.desc_counter}`}>
            {descCounter} / 500
          </p>
        </div>
      </div>
      <div>
        <p className={styles.title}>Фото готового блюда</p>
        <PhotoButton />
        <p className={styles.fotoReqs}>Требования к фото:</p>
        <ul className={styles.reqlist}>
          <li className={styles.reqlist_item}>
            Форматы JPEG, JPG, PNG или WEBP
          </li>
          <li className={styles.reqlist_item}>
            Размер файла не больше&nbsp;
            <span className={styles.reqlist_accent}>5 мб</span>
          </li>
        </ul>
      </div>
      <div className={styles.controls}>
        <Button btnClassName={buttons.withBorder.yellow} isSubmit>
          далее <img src={arrowRight} alt="стрелка вправо" />
        </Button>
      </div>
    </form>
  );
};
export default MainInfo;
