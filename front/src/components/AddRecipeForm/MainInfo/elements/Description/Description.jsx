import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import cn from 'classnames';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { FieldWrap } from '../FieldWrap/FieldWrap';
import { LetterCounter } from '../LetterCounter/LetterCounter';
import styles from './Description.module.scss';

export const Description = () => {
  const [descCounter, setDescCounter] = useState(0);

  const {
    register,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  function descChange(event) {
    setDescCounter(event.target.value.length);
  }

  return (
    <>
      <p className={styles.subtitle}>
        Кратко расскажите о вашем рецепте.
        <br />
        Например, какой у него вкус, особенности, или как вы о нём узнали.
      </p>

      <FieldWrap className={styles.wrap} isError={!!errors?.recipedesc}>
        <textarea
          {...register('recipedesc', {
            minLength: {
              value: 2,
              message: 'Введите не менее двух символов',
            },
            maxLength: {
              value: 500,
              message: 'Максимальная длина 500 символов',
            },
            pattern: {
              value:
                /^[a-zA-Zа-яА-ЯёЁ0-9\s!@#$%^&№()_+\-=[\]{};':"\\|,.<>/?]+$/i,
              message:
                'Используйте буквы, цифры и символы !-&rdquo;№;%:?*()&rsquo;/.,\\«»',
            },
          })}
          className={cn(styles.description, {
            [styles.desc__input_error]: errors?.recipedesc,
          })}
          onChange={descChange}
          onClick={() => clearErrors('recipedesc')}
          maxLength={500}
          name="recipedesc"
          id="recipedesc"
          placeholder="Описание рецепта"
        />

        <LetterCounter
          count={descCounter}
          total={500}
          isError={errors?.recipedesc}
          className={styles.counter}
        />
      </FieldWrap>

      {errors?.recipedesc && (
        <ErrorMessage message={errors?.recipedesc.message} />
      )}
    </>
  );
};
