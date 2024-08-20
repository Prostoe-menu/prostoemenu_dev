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

export const RecipePortions = () => {
  const { register, formState, clearErrors } = useFormContext();

  const [portion, setPortion] = useState(0);

  function incrementPortion() {
    setPortion((prev) => prev + 1);

    if (formState.errors?.portions) clearErrors('portions');
  }

  function decrementPortion() {
    setPortion((prev) => prev - 1);

    console.log(portion);

    //trigger('portions');

    //clearErrors('portions');
  }

  useEffect(() => {
    console.log(portion);
  }, [portion]);

  return (
    <div>
      <Title>Количество порций*</Title>
      <div
        className={cn(styles.wrap, {
          [styles.error]: formState.errors?.portions,
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
          {...register('portions', {
            required: 'Укажите количество порций. Это обязательное поле',
            min: { value: 1, message: 'Укажите количество порций' },
          })}
          type="text"
          placeholder="0"
          value={portion}
          readOnly
          aria-invalid={!!formState.errors?.portions}
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

      {formState.errors?.portions && (
        <ErrorMessage message={formState.errors?.portions.message} />
      )}
    </div>
  );
};
