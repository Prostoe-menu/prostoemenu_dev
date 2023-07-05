/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Rating } from '@mui/material';
import Tooltip from '../Tooltip/Tooltip';
import TooltipDifficultyContent from '../Tooltip/TooltipDifficultyContent/TooltipDifficultyContent';
import PhotoButton from '../../UI/PhotoButton/PhotoButton';
import Button from '../../UI/Button/Button';
import {
  changeCurrentStage,
  saveGeneralRecipeInfo,
  saveRecipeComplexity,
  saveServings,
} from '../../../store/slices/form/formSlice';
import styles from './mainInfo.module.scss';
import { buttons } from '../../../utils/constants';
import arrowRight from '../../../images/arrow-right.svg';

const MainInfo = () => {
  const [nameCounter, setNameCounter] = useState(0);
  const [descCounter, setDescCounter] = useState(0);
  const [portion, setPortion] = useState(1);

  const dispatch = useDispatch();
  const { recipeName } = useSelector((state) => state.form);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { recipeName },
    mode: 'onBlur',
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
    dispatch(saveServings(portion + 1));
  }

  function decrementPortion() {
    setPortion(portion - 1);
    dispatch(saveServings(portion - 1));
  }

  return (
    <form className={styles.mainInfo} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h3 className={styles.title}>Название рецепта</h3>
        <div
          className={`${styles.wrap} ${
            errors.recipeName ? `${styles.wrap_error}` : ''
          }`}
        >
          <input
            {...register('recipeName', {
              required: true,
              minLength: 2,
              maxLength: 100,
              pattern: {
                value:
                  /^[a-zA-Zа-яА-ЯёЁ0-9\s!@#$%^&№()_+\-=[\]{};':"\\|,.<>/?]+$/i,
              },
            })}
            className={`${styles.name__input} ${
              errors.recipeName ? `${styles.name__input_error}` : ''
            }`}
            onChange={nameChange}
            type="text"
            placeholder="Название вашего блюда"
          />

          <p
            className={`${styles.counter} ${
              errors.recipeName ? `${styles.counter_error}` : ''
            }`}
          >
            {nameCounter} / 100
          </p>
        </div>
        {errors?.recipeName?.type === 'required' && (
          <p className={styles.error}>Это поле обязательно к заполнению</p>
        )}
        {errors?.recipeName?.type === 'minLength' && (
          <p className={styles.error}>Введите не менее двух символов</p>
        )}
        {errors?.recipeName?.type === 'maxLength' && (
          <p className={styles.error}>Максимальная длина 100 символов</p>
        )}
        {errors?.recipeName?.type === 'pattern' && (
          <p className={styles.error}>
            Используйте буквы, цифры и символы !-&rdquo;№;%:?*()&rsquo;/.,\\«»
          </p>
        )}
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
            <Rating
              name="recipeComplexity"
              defaultValue={1}
              max={3}
              size="large"
              onChange={(event, newValue) => {
                dispatch(saveRecipeComplexity(newValue));
              }}
            />
          </ul>
        </div>
        <div>
          <p className={styles.title}>Количество порций</p>
          <div className={styles.wrap_counter}>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonMinus}`}
              onClick={decrementPortion}
              disabled={portion === 1 && true}
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
        <div
          className={`${styles.descinput__wrap} ${
            errors.recipedesc ? `${styles.descinput__wrap_error}` : ''
          }`}
        >
          <textarea
            {...register('recipedesc', {
              required: true,
              minLength: 2,
              maxLength: 500,
              pattern: {
                value:
                  /^[a-zA-Zа-яА-ЯёЁ0-9\s!@#$%^&№()_+\-=[\]{};':"\\|,.<>/?]+$/i,
              },
            })}
            className={`${styles.desc__input} ${
              errors.recipedesc ? `${styles.desc__input_error}` : ''
            }`}
            onChange={descChange}
            name="recipedesc"
            id="recipedesc"
            placeholder="Описание рецепта"
          />

          <p
            className={`${styles.counter} ${styles.desc__counter} ${
              errors.recipedesc ? `${styles.desc__counter_error}` : ''
            }`}
          >
            {descCounter} / 500
          </p>
        </div>
        {errors?.recipedesc?.type === 'required' && (
          <p className={styles.error}>Это поле обязательно к заполнению</p>
        )}
        {errors?.recipedesc?.type === 'minLength' && (
          <p className={styles.error}>Введите не менее двух символов</p>
        )}
        {errors?.recipedesc?.type === 'maxLength' && (
          <p className={styles.error}>Максимальная длина 500 символов</p>
        )}
        {errors?.recipedesc?.type === 'pattern' && (
          <p className={styles.error}>
            Используйте буквы, цифры и символы !-&rdquo;№;%:?*()&rsquo;/.,\\«»
          </p>
        )}
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
