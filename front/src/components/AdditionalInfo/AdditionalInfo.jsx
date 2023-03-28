import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './AdditionalInfo.module.scss';

const AdditionalInfo = () => {
  const [description, setDescription] = React.useState('');
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  function handleDescription(evt) {
    setDescription(evt.target.value);
  }
  return (
    <section className={styles.additionalInfo}>
      <div className={styles.additionalInfo__comment}>
        <div className={styles.description}>
          <h3 className={styles.description__subtitle}>Примечание </h3>
          <p className={styles.description__text}>
            В этом поле вы можете написать дополнительную информацию о рецепте:
            как подавать блюдо, чем его можно украсить и с чем сочетать.
          </p>
        </div>
        <div
          // className={styles.additionalInfo__textArea}
          className={`${styles.additionalInfo__textArea} ${
            errors.addInfo ? `${styles.additionalInfo__textArea_error}` : ''
          }`}
        >
          <textarea
            className={styles.additionalInfo__textAreaText}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            placeholder="Примечание"
            onChange={handleDescription}
            maxLength="500"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('addInfo', {
              pattern: {
                value:
                  /^[a-zA-Zа-яА-ЯёЁ0-9\s!@#$%^&№()_+\-=[\]{};':"\\|,.<>/?]+$/i,
                message:
                  'Используйте буквы русского и английского алфавитов, цифры и знаки препинания',
              },
            })}
          />
          <span
            className={`${styles.additionalInfo__textAreaCounter} ${
              errors.addInfo
                ? `${styles.additionalInfo__textAreaCounter_error}`
                : ''
            }`}
          >
            {`${description.length}/500`}
          </span>
        </div>
        {errors.addInfo && (
          <span className={styles.description__error}>
            {' '}
            {errors?.addInfo.message || ''}
          </span>
        )}
      </div>
      <div className={styles.description}>
        <h3 className={styles.description__subtitle}>Имя автора </h3>
        <p className={styles.description__text}> будет указано в рецепте</p>
        <input
          type="text"
          className={`${styles.description__input} ${
            errors.name ? `${styles.description__input_error}` : ''
          }`}
          placeholder="Ваше имя*"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('name', {
            required: true,
            minLength: {
              value: 2,
              message: 'Введите не менее 2-х символов',
            },
            maxLength: {
              value: 50,
              message: 'Максимальная длина 50 символов',
            },
            pattern: {
              value: /^[А-Яа-яёЁA-Za-z0-9\s-_,.]+$/i,
              message:
                'Разрешены только латинские буквы, кириллические буквы, знаки дефиса и пробелы.',
            },
          })}
        />
        {errors.name && (
          <span className={styles.description__error}>
            {' '}
            {errors?.name.message || 'Поле обязательно к заполнению'}
          </span>
        )}
      </div>
    </section>
  );
};

export default AdditionalInfo;
