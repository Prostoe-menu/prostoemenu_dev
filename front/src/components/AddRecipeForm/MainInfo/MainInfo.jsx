import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { Rating } from '@mui/material';
import Tooltip from 'components/Tooltip/Tooltip';
import TooltipDifficultyContent from 'components/Tooltip/TooltipDifficultyContent/TooltipDifficultyContent';
import {
  changeCurrentStage,
  saveGeneralRecipeInfo,
  saveRecipeComplexity,
  saveServings,
} from 'store/slices/form/formSlice';
import Button from 'ui/Button';
import PhotoButton from 'ui/PhotoButton';
import { LetterCounter } from './elements/LetterCounter/LetterCounter';
import { CookTime, Description, ErrorMessage } from './elements';
import styles from './MainInfo.module.scss';

const defaultValues = {
  recipeName: '',
  recipeComplexity: null,
  portions: 0,
  allhours: null,
  allminutes: null,
  cookhours: null,
  cookminutes: null,
  recipedesc: '',
};

const MainInfo = () => {
  const [nameCounter, setNameCounter] = useState(0);
  const [portion, setPortion] = useState(0);

  const dispatch = useDispatch();
  // const { recipeName } = useSelector((state) => state.form);

  const methods = useForm({
    defaultValues,
    mode: 'onTouched',
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
    const { value } = event.target;
    const firstLetter = value.slice(0, 1);

    setNameCounter((prev) => {
      if (prev === 0) {
        methods.setValue(
          'recipeName',
          firstLetter.toUpperCase() + value.slice(1)
        );
      }
      return value.length;
    });
  }

  function incrementPortion() {
    setPortion(portion + 1);
    dispatch(saveServings(portion + 1));
    methods.clearErrors('portions');
  }

  function decrementPortion() {
    setPortion(portion - 1);
    dispatch(saveServings(portion - 1));
    methods.clearErrors('portions');
  }

  // const allmins = () => {
  //   console.log(getValues('allminutes'));
  //   const { allminutes } = getValues();
  //   console.log(!!allminutes);
  //   return !!allminutes;
  // };

  // const cookmins = () => {
  //   if (methods.getValues('cookminutes') === undefined || '') {
  //     return true;
  //   }
  //   return false;
  // };

  return (
    <FormProvider {...methods}>
      <form
        className={styles.mainInfo}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div>
          <h4 className={styles.title}>Название рецепта*</h4>
          <div
            className={cn(styles.wrap, {
              [styles.wrapError]: methods.formState.errors?.recipeName,
            })}
          >
            <textarea
              {...methods.register('recipeName', {
                required: 'Это поле обязательно к заполнению',
                minLength: {
                  value: 2,
                  message: 'Введите не менее двух символов',
                },
                maxLength: {
                  value: 100,
                  message: 'Максимальная длина 100 символов',
                },
                pattern: {
                  value: /^[a-zA-Zа-яА-ЯёЁ0-9\s!\-"№;%:?*()'/.,\\«»]+$/i,
                  message:
                    'Используйте буквы, цифры и символы !-"№;%:?*()\'/.,\\«»',
                },
              })}
              className={cn(styles.recipeName, {
                [styles.recipeNameError]: methods.formState.errors?.recipeName,
              })}
              aria-invalid={
                methods.formState.errors?.recipeName ? 'true' : 'false'
              }
              type="text"
              maxLength={100}
              rows={nameCounter > 58 ? 2 : 1}
              wrap="soft"
              placeholder="Название вашего блюда"
              onChange={nameChange}
            />

            <LetterCounter
              count={nameCounter}
              total={100}
              isError={!!methods.formState.errors?.recipeName}
            />
          </div>

          {methods.formState.errors?.recipeName && (
            <ErrorMessage
              message={methods.formState.errors?.recipeName.message}
            />
          )}
        </div>

        <section className={styles.complexityWrap}>
          <div className={styles.complexity}>
            <div className={styles.tooltipContainer}>
              <h4 className={styles.title}>Сложность*</h4>
              <Tooltip
                toolTipContent={<TooltipDifficultyContent />}
                width="129px"
              />
            </div>
            <ul className={styles.stars}>
              <Controller
                name="rating"
                control={methods.control}
                defaultValue={0}
                rules={{ required: true }}
                // eslint-disable-next-line no-unused-vars
                render={(props) => (
                  <Rating
                    name="recipeComplexity"
                    defaultValue={0}
                    max={3}
                    size="large"
                    onClick={() => methods.clearErrors('rating')}
                    onChange={(event, newValue) => {
                      dispatch(saveRecipeComplexity(newValue));
                    }}
                  />
                )}
              />
            </ul>
            {methods.formState.errors?.rating?.type === 'required' && (
              <p className={styles.error}>Это поле обязательно к заполнению</p>
            )}
          </div>
          <div>
            <h4 className={styles.title}>Количество порций*</h4>
            <label htmlFor="portions" className={styles.title}>
              <div
                className={cn(styles.wrap_counter, {
                  [styles.wrap_counter_error]:
                    methods.formState.errors?.portions,
                })}
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
                  control={methods.control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <input
                      {...methods.register('portions')}
                      aria-invalid={
                        methods.formState.errors?.portions ? 'true' : 'false'
                      }
                      type="text"
                      id="portions"
                      placeholder="0"
                      value={portion}
                      onClick={() => methods.clearErrors('portions')}
                      onChange={(e) => field.onChange(e)}
                      className={cn(
                        styles.portion,
                        { [styles.portion_active]: portion > 0 },
                        {
                          [styles.portion_error]:
                            portion === 0 && methods.formState.errors?.portions,
                        }
                      )}
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
            {methods.formState.errors?.portions?.type === 'required' && (
              <p className={styles.error}>Это поле обязательно к заполнению</p>
            )}
          </div>
        </section>

        <section>
          <h4 className={styles.title}>Время приготовления*</h4>

          <div className={styles.cookTimeWrap}>
            <CookTime
              title="Всего"
              hoursName="allhours"
              minutesName="allminutes"
            />
            <CookTime
              title="Время «У плиты»"
              hoursName="cookhours"
              minutesName="cookminutes"
              tooltip="Время активной готовки блюда без учёта того, сколько оно варится, жарится, запекается и т.д."
            />
          </div>
        </section>

        <section>
          <h4 className={styles.title}>Описание</h4>
          <Description />
        </section>

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
          <Button className={styles.button_primary} type="submit">
            Далее
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
export default MainInfo;
