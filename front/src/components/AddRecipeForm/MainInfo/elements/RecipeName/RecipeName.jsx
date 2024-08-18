import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import cn from 'classnames';
import { ErrorMessage, FieldWrap, LetterCounter, Title } from '../';
import styles from './RecipeName.module.scss';

export const RecipeName = () => {
  const { register, formState, setValue } = useFormContext();

  const [nameCounter, setNameCounter] = useState(0);

  const changeHandler = (event) => {
    const { value } = event.target;
    const firstLetter = value.slice(0, 1);

    setNameCounter((prev) => {
      if (prev === 0) {
        setValue('recipeName', firstLetter.toUpperCase() + value.slice(1));
      }
      return value.length;
    });
  };

  return (
    <section>
      <Title>Название рецепта*</Title>

      <FieldWrap
        className={styles.wrap}
        isError={!!formState.errors?.recipeName}
      >
        <textarea
          {...register('recipeName', {
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
            [styles.recipeNameError]: formState.errors?.recipeName,
          })}
          aria-invalid={formState.errors?.recipeName ? 'true' : 'false'}
          type="text"
          maxLength={100}
          rows={nameCounter > 58 ? 2 : 1}
          wrap="soft"
          placeholder="Название вашего блюда"
          onChange={changeHandler}
        />

        <LetterCounter
          count={nameCounter}
          total={100}
          isError={!!formState.errors?.recipeName}
        />
      </FieldWrap>

      {formState.errors?.recipeName && (
        <ErrorMessage message={formState.errors?.recipeName.message} />
      )}
    </section>
  );
};
