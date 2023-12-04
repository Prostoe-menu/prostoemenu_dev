/* eslint-disable react/jsx-props-no-spreading */
import classnames from 'classnames';
import styles from './Input.module.scss';

/**
 * Переиспользуемый компонент инпута.
 * Представляет собой инпут с по умолчанию type='text', адаптация стилей и логики происходит через пропсы.
 * */

const Input = (props) => {
  const {
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
    onChange,
    onKeyDown,
    placeholderText,
    inputValue,
    inputType,
    inputStep,
  } = props;

  const inputClasses = classnames(styles.input, styles[inputClassName], {
    [styles.error]: isError,
  });

  return (
    <input
      className={inputClasses}
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
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholderText}
      autoComplete="off"
      value={inputValue}
      type={inputType}
      step={inputStep}
    />
  );
};

export default Input;
