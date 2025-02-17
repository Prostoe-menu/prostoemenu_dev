import { FieldValues, RegisterOptions, useFormContext } from 'react-hook-form';
import cn from 'classnames';
import styles from './CookTimeField.module.scss';

type TCookTimeFieldProps = {
  name: string;
  label: string;
  params: RegisterOptions<FieldValues, string>;
};

export const CookTimeField = ({ name, label, params }: TCookTimeFieldProps) => {
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
