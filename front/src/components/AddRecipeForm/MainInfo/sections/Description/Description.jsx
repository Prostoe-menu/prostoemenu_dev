import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import cn from 'classnames';
import {
  ErrorMessage,
  FieldWrap,
  LetterCounter,
  Title,
} from 'components/AddRecipeForm/MainInfo/elements';
import styles from './Description.module.scss';

const inputName = 'description';

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
    <section>
      <Title>Описание</Title>

      <p className={styles.subtitle}>
        Кратко расскажите о вашем рецепте.
        <br />
        Например, какой у него вкус, особенности, или как вы о нём узнали.
      </p>

      <FieldWrap className={styles.wrap} isError={!!errors[inputName]}>
        <textarea
          {...register(inputName, {
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
            [styles.desc__input_error]: !!errors[inputName],
          })}
          onChange={descChange}
          onClick={() => clearErrors(inputName)}
          maxLength={500}
          name={inputName}
          id={inputName}
          placeholder="Описание рецепта"
        />

        <LetterCounter
          count={descCounter}
          total={500}
          isError={errors[inputName]}
          className={styles.counter}
        />
      </FieldWrap>

      {errors[inputName] && (
        <ErrorMessage message={errors[inputName].message} />
      )}
    </section>
  );
};
