import { forwardRef } from 'react';
import cn from 'classnames';
import styles from './Input.module.scss';

const Input = forwardRef(function Input(props, ref) {
  const { className, isError, ...params } = props;

  const inputClasses = cn(styles.input, className, {
    [styles.inputError]: isError,
  });

  return (
    <input {...params} ref={ref} className={inputClasses} autoComplete="off" />
  );
});

export default Input;
