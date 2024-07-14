import { useFormContext } from 'react-hook-form';
import cn from 'classnames';
import styles from './CookTimeField.module.scss';

export const CookTimeField = ({ name, label, params }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <label htmlFor={name} className={styles.label}>
        <input
          id={name}
          type="text"
          placeholder="0"
          defaultValue=""
          maxLength={2}
          {...register(name, { ...params })}
          className={cn(styles.time, {
            [styles.error]: errors[name],
          })}
        />
        {label}
      </label>
    </>
  );
};
