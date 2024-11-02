import { useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import {
  selectIngredients,
  selectMeasureOptions,
} from 'store/slices/form/formSelect';
import {
  nextStep,
  prevStep,
  saveIngredients,
} from 'store/slices/form/formSlice';
import { getMeasureOptions } from 'store/slices/form/formThunk';
import { addNotification } from 'store/slices/toast/toastSlice';
import Button from 'ui/Button';
import { IngredientName, VolumeInput } from './elements';
import SVGAdd from 'assets/images/add.svg?react';
import SVGDelete from 'assets/images/icon_cross.svg?react';
import styles from './Ingredients.module.scss';

const initialIngredients = {
  ingredients: [
    {
      ingredient: null,
      measure: {
        label: 'г.',
        value: 1,
      },
      volume: null,
    },
  ],
};

const Ingredients = () => {
  const ingredients = useSelector(selectIngredients) || initialIngredients;
  const measureOptions = useSelector(selectMeasureOptions);

  const dispatch = useDispatch();

  const { register, control, handleSubmit, formState } = useForm({
    mode: 'onTouched',
    shouldFocusError: false,
    defaultValues: {
      ...ingredients,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const submitHandler = (data) => {
    console.log('step2 data: ', data);

    dispatch(saveIngredients(data));
    dispatch(nextStep());

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const onGoBack = () => {
    dispatch(prevStep());

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (formState.errors.ingredients?.length > 0)
      dispatch(addNotification('Все поля обязательны для заполнения!'));
  }, [dispatch, formState.errors.ingredients?.length]);

  useEffect(() => {
    if (!measureOptions) dispatch(getMeasureOptions());
  }, [dispatch, measureOptions]);

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <section className={styles.ingredients}>
        <ul className={styles.list}>
          {fields.map((item, index) => (
            <li key={item.id} id={item.id} className={styles.ingredientItem}>
              <Controller
                name={`ingredients.${index}.ingredient`}
                render={({ field }) => (
                  <IngredientName
                    {...field}
                    isError={
                      !!formState.errors.ingredients?.[index]?.ingredient
                    }
                  />
                )}
                control={control}
                rules={{ required: true }}
              />

              <VolumeInput
                {...register(`ingredients.${index}.volume`, {
                  require: true,
                  maxLength: 4,
                  valueAsNumber: true,
                  pattern: {
                    value: /\d*\.*\d+/,
                    message:
                      'Можно использовать только цифры и точку. Например, 3.50, 125',
                  },
                  validate: (volumeValue) => {
                    return volumeValue > 0;
                  },
                })}
                isError={!!formState.errors.ingredients?.[index]?.volume}
              />

              <Controller
                name={`ingredients.${index}.measure`}
                render={({ field }) => {
                  const { value, ...params } = field;
                  return (
                    <Select
                      {...params}
                      options={measureOptions}
                      defaultValue={value}
                      unstyled
                      className="select-container"
                      classNamePrefix="select"
                    />
                  );
                }}
                control={control}
                rules={{ required: true }}
              />
              {fields.length > 1 && (
                <Button type="button" view="icon" onClick={() => remove(index)}>
                  <SVGDelete />
                </Button>
              )}
            </li>
          ))}
        </ul>

        <Button
          type="button"
          view="tertiary"
          disabled={fields.length >= 20}
          onClick={(event) => {
            event.preventDefault();
            append(initialIngredients[0], { shouldFocus: false });
          }}
          aria-label="Добавить ингредиент"
        >
          <SVGAdd />
          Добавить ингредиент
        </Button>
      </section>

      <div className={styles.controls}>
        <Button view="secondary" onClick={onGoBack}>
          Назад
        </Button>
        <Button type="submit">Далее</Button>
      </div>
    </form>
  );
};

export default Ingredients;
