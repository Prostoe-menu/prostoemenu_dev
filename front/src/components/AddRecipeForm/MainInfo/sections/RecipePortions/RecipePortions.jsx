import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import cn from 'classnames';
import {
  ErrorMessage,
  Title,
} from 'components/AddRecipeForm/MainInfo/elements';
import { Button } from 'ui';
import SVGMinus from 'assets/images/minus.svg?react';
import SVGPlus from 'assets/images/plus.svg?react';
import styles from './RecipePortions.module.scss';

const inputName = 'quantity';

export const RecipePortions = () => {
  const { register, formState, setValue, getValues, clearErrors } =
    useFormContext();

  const [portion, setPortion] = useState(0);

  const inputError = formState.errors[inputName];

  function incrementPortion() {
    setPortion((prev) => prev + 1);

    inputError && clearErrors(inputName);
  }

  function decrementPortion() {
    setPortion((prev) => prev - 1);
  }

  useEffect(() => {
    const defaultPortions = getValues(inputName);
    defaultPortions && setPortion(defaultPortions);
  }, [getValues]);

  useEffect(() => {
    portion && setValue(inputName, portion);
  }, [portion, setValue]);

  return (
    <div>
      <Title>Количество порций*</Title>
      <div
        className={cn(styles.wrap, {
          [styles.error]: !!inputError,
        })}
      >
        <Button
          view="icon"
          onClick={decrementPortion}
          disabled={portion === 0}
          aria-label="Минус"
        >
          <SVGMinus />
        </Button>

        <input
          {...register(inputName, {
            required: 'Укажите количество порций. Это обязательное поле',
            valueAsNumber: true,
            min: { value: 1, message: 'Укажите количество порций' },
          })}
          type="text"
          placeholder="0"
          readOnly
          aria-invalid={!!inputError}
          className={cn(styles.portion, {
            [styles.active]: portion > 0,
          })}
        />

        <Button
          view="icon"
          onClick={incrementPortion}
          disabled={portion === 10}
          aria-label="Плюс"
        >
          <SVGPlus />
        </Button>
      </div>

      {inputError && <ErrorMessage message={inputError.message} />}
    </div>
  );
};
