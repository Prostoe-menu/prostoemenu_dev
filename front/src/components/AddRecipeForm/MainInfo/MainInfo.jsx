/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Rating } from '@mui/material';
import Tooltip from 'components/Tooltip/Tooltip';
import TooltipDifficultyContent from 'components/Tooltip/TooltipDifficultyContent/TooltipDifficultyContent';
import Button from 'components/UI/Button/Button';
import PhotoButton from 'components/UI/PhotoButton/PhotoButton';
import arrowRight from 'images/arrow-right.svg';
import {
  changeCurrentStage,
  saveGeneralRecipeInfo,
  saveRecipeComplexity,
  saveServings,
} from 'store/slices/form/formSlice';
import { buttons } from 'utils/constants';
import styles from './mainInfo.module.scss';

const MainInfo = () => {
  const [nameCounter, setNameCounter] = useState(0);
  const [descCounter, setDescCounter] = useState(0);
  const [portion, setPortion] = useState(0);

  const dispatch = useDispatch();
  const { recipeName } = useSelector((state) => state.form);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    getValues,
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
    clearErrors('portions');
  }

  function decrementPortion() {
    setPortion(portion - 1);
    dispatch(saveServings(portion - 1));
    clearErrors('portions');
  }

  const allmins = () => {
    if (getValues('allminutes') === undefined || '') {
      return true;
    }
    return false;
  };
  const cookmins = () => {
    if (getValues('cookminutes') === undefined || '') {
      return true;
    }
    return false;
  };

  return (
    <form className={styles.mainInfo} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h3 className={styles.title}>Название рецепта</h3>
        <div
          className={`${styles.wrap} ${
            errors.recipeName ? `${styles.wrap_error}` : ''
          }`}
        >
          <textarea
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
            onClick={() => clearErrors('recipeName')}
            type="text"
            maxLength={100}
            rows={nameCounter > 58 ? 2 : 1}
            wrap="soft"
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
            <Controller
              name="rating"
              control={control}
              defaultValue={0}
              rules={{ required: true }}
              // eslint-disable-next-line no-unused-vars
              render={(props) => (
                <Rating
                  name="recipeComplexity"
                  defaultValue={0}
                  max={3}
                  size="large"
                  onClick={() => clearErrors('rating')}
                  onChange={(event, newValue) => {
                    dispatch(saveRecipeComplexity(newValue));
                  }}
                />
              )}
            />
          </ul>
          {errors?.rating?.type === 'required' && (
            <p className={styles.error}>Это поле обязательно к заполнению</p>
          )}
        </div>
        <div>
          <label htmlFor="portions" className={styles.title}>
            Количество порций
            <div
              className={`${styles.wrap_counter} ${
                errors.portions ? `${styles.wrap_counter_error}` : ''
              }`}
            >
              <button
                type="button"
                className={`${styles.button} ${styles.buttonMinus}`}
                onClick={decrementPortion}
                disabled={portion === 0 && true}
                aria-label="Минус"
              >
                {' '}
              </button>

              <Controller
                name="portions"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    {...register('portions')}
                    aria-invalid={errors.portions ? 'true' : 'false'}
                    type="text"
                    id="portions"
                    placeholder="0"
                    value={portion}
                    onClick={() => clearErrors('portions')}
                    onChange={(e) => field.onChange(e)}
                    className={
                      portion === 0
                        ? `${styles.portion} ${
                            errors?.portions ? `${styles.portion_error}` : ''
                          }`
                        : `${styles.portion} ${styles.portion_active}`
                    }
                  />
                )}
              />

              <button
                type="button"
                className={`${styles.button} ${styles.buttonPlus}`}
                onClick={incrementPortion}
                disabled={portion === 10 && true}
                aria-label="Плюс"
              >
                {' '}
              </button>
            </div>
          </label>
          {errors?.portions?.type === 'required' && (
            <p className={styles.error}>Это поле обязательно к заполнению</p>
          )}
        </div>
      </div>
      <div>
        <p className={styles.title}>Время приготовления</p>
        <div className={styles.wrap_count}>
          <div className={styles.wrap_totalTime}>
            <h4 className={styles.totalTime}>Всего</h4>
            <label htmlFor="allhours" className={styles.label}>
              <input
                {...register('allhours', {
                  required: allmins,
                  pattern: /[0-99]/,
                })}
                type="text"
                id="allhours"
                placeholder="0"
                defaultValue=""
                className={`${styles.time} ${
                  errors.allhours
                    ? `${styles.name__input_error} ${styles.time_error}`
                    : ''
                }`}
                onClick={() => clearErrors('allhours')}
              />
              &nbsp;час(ов)
            </label>
            {errors?.allhours?.type === 'required' && (
              <p className={styles.error}>Это поле обязательно к заполнению</p>
            )}
            <label htmlFor="allminutes" className={styles.label}>
              <input
                {...register('allminutes', {
                  required: true,
                  pattern: /[0-59]/,
                })}
                type="text"
                id="allminutes"
                placeholder="0"
                defaultValue=""
                className={`${styles.time} ${
                  errors.allminutes
                    ? `${styles.name__input_error} ${styles.time_error}`
                    : ''
                }`}
                onClick={() => clearErrors(['allhours', 'allminutes'])}
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
                {...register('cookhours', {
                  required: cookmins,
                  pattern: /[0-99]/,
                })}
                type="text"
                id="cookhours"
                placeholder="0"
                maxLength={2}
                onClick={() => clearErrors('cookhours')}
                className={`${styles.time} ${
                  errors.cookhours
                    ? `${styles.name__input_error} ${styles.time_error}`
                    : ''
                }`}
              />
              &nbsp;час(ов)
            </label>
            {errors?.cookhours?.type === 'required' && (
              <p className={styles.error}>Это поле обязательно к заполнению</p>
            )}
            <label htmlFor="cookminutes" className={styles.label}>
              <input
                {...register('cookminutes', {
                  required: true,
                  pattern: /[0-59]/,
                })}
                type="text"
                id="cookminutes"
                placeholder="0"
                onClick={() => clearErrors(['cookhours', 'cookminutes'])}
                className={`${styles.time} ${
                  errors.cookminutes
                    ? `${styles.name__input_error} ${styles.time_error}`
                    : ''
                }`}
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
              required: false,
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
            onClick={() => clearErrors('recipedesc')}
            maxLength={500}
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
