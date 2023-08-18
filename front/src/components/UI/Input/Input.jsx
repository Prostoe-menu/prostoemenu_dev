/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styles from './Input.module.scss';

const Input = ({
  inputClassName,
  isError,
  register,
  inputName,
  requiredValue,
  requiredMessage,
  patternValue,
  patternMessage,
  handleChangeInput,
  handleOnKeyDown,
  placeholderText,
  inputValue,
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
    })}
    onChange={handleChangeInput}
    onKeyDown={handleOnKeyDown}
    placeholder={placeholderText}
    autoComplete="off"
    value={inputValue}
  />
);

export default Input;
