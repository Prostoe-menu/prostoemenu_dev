import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import {
  changeCurrentStage,
  saveGeneralRecipeInfo,
  saveServings,
} from 'store/slices/form/formSlice';
import Button from 'ui/Button';
import PhotoButton from 'ui/PhotoButton';
import {
  CookTime,
  Description,
  RecipeComplexity,
  RecipeName,
} from './elements';
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
  const [portion, setPortion] = useState(0);

  const dispatch = useDispatch();

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
        <RecipeName />

        <section className={styles.complexityWrap}>
          <RecipeComplexity />

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
