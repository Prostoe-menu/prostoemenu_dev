import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import cn from 'classnames';
import { useDebounce } from 'hooks/useDebounce';
import { ErrorMessage, FieldWrap, LetterCounter, Title } from '../../elements';
import styles from './RecipeName.module.scss';

const inputName = 'title';

export const RecipeName = () => {
  const { register, formState, setValue } = useFormContext();

  const [nameCounter, setNameCounter] = useState(
    formState.defaultValues[inputName]?.length || 0
  );

  const inputError = formState.errors[inputName];

  const debounceSetValue = useDebounce((val) => {
    setValue(inputName, val, {
      shouldValidate: true,
    });
  }, 1000);

  const changeHandler = (event) => {
    const { value } = event.target;
    const firstLetter = value.slice(0, 1);

    setNameCounter(value.length);

    debounceSetValue(firstLetter.toUpperCase() + value.slice(1));
  };

  return (
    <section>
      <Title>Название рецепта*</Title>

      <FieldWrap className={styles.wrap} isError={!!inputError}>
        <textarea
          {...register(inputName, {
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
            [styles.recipeNameError]: !!inputError,
          })}
          aria-invalid={!!inputError}
          type="text"
          maxLength={100}
          rows={nameCounter > 58 ? 2 : 1}
          wrap="soft"
          placeholder="Название вашего блюда"
          onChange={changeHandler}
        />

        <LetterCounter count={nameCounter} total={100} isError={!!inputError} />
      </FieldWrap>

      {inputError && <ErrorMessage message={inputError.message} />}
    </section>
  );
};
