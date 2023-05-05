/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import styles from './Legal.module.scss';

const Legal = ({ register, errors }) => (
  <div className={styles.legal}>
    <h3 className={styles.legal__title}>Почти готово :)</h3>
    <label className={styles.legal__email} htmlFor="email">
      Укажите вашу электронную почту, так мы сможем сообщить вам, когда ваш
      рецепт будет опубликован.
      <input
        className={`${styles.legal__input} ${
          errors.email ? styles.legal__input_error : ''
        }`}
        type="text"
        name="email"
        id="email"
        placeholder="Электронная почта*"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register('email', {
          required: true,
          pattern: {
            value: '',
            message: 'Введите корректный e-mail',
          },
          minLength: {
            value: 6,
            message: 'Введите не менее 6 символов',
          },
          maxLength: {
            value: 100,
            message: '',
          },
        })}
      />
    </label>
    {errors.email && (
      <span className={styles.error}>
        {errors.email.type === 'required'
          ? 'Поле обязательно к заполнению'
          : errors.email.message}
      </span>
    )}
    <label htmlFor="agreement" className={styles.legal__agreement}>
      <input
        className={styles.legal__input_hide}
        type="checkbox"
        name="agreement"
        id="agreement"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register('agreementCheckbox', { required: true })}
      />
      <div
        className={`${styles.legal__checkbox} ${
          errors.agreementCheckbox ? styles.legal__checkbox_error : ''
        }`}
      />
      Согласен(на) с политикой конфиденциальности
    </label>
  </div>
);

export default Legal;
