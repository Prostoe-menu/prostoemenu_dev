/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styles from './Input.module.scss';

/**
 * Переиспользуемый компонент инпута.
 * Представляет собой инпут с по умолчанию type='text', адаптация стилей и логики происходит через пропсы.
 * */

const Input = ({
  inputClassName,
  isError,
  register,
  inputName,
  requiredValue,
  requiredMessage,
  patternValue,
  patternMessage,
  minValue,
  minMessage,
  handleChangeInput,
  handleOnKeyDown,
  placeholderText,
  inputValue,
  inputType = 'text',
  inputStep,
}) => (
  <input
    className={`${styles.input} ${styles[inputClassName]} ${
      isError && styles.input_error
    }}`}
    {...register(inputName, {
      required: {
        value: requiredValue,
        message: requiredMessage,
      },
      pattern: {
        value: patternValue,
        message: patternMessage,
      },
      min: {
        value: minValue,
        message: minMessage,
      },
    })}
    onChange={handleChangeInput}
    onKeyDown={handleOnKeyDown}
    placeholder={placeholderText}
    autoComplete="off"
    value={inputValue}
    type={inputType}
    step={inputStep}
  />
);

export default Input;
