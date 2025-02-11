import { useFormContext } from 'react-hook-form';
import { Tooltip } from 'components/Tooltip';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { CookTimeField } from './CookTimeField';
import styles from './CookTime.module.scss';

type TCookTimeProps = {
  title: string;
  hoursName: string;
  minutesName: string;
  tooltip?: string;
};

export const CookTime = ({
  title,
  hoursName,
  minutesName,
  tooltip,
}: TCookTimeProps) => {
  const {
    getValues,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <div className={styles.titleWrap}>
        <p className={styles.title}>{title}</p>
        {tooltip && <Tooltip toolTipContent={tooltip} />}
      </div>

      <div className={styles.timeWrap}>
        <CookTimeField
          name={hoursName}
          label="час(ов)"
          params={{
            pattern: {
              value: /^\d{1,2}$/,
              message: 'Только цифры',
            },
            validate: {
              checkMinutes: (val: number) => {
                if (val > 0) clearErrors(minutesName);

                return (
                  val > 0 ||
                  getValues(hoursName) > 0 ||
                  'Укажите время приготовления'
                );
              },
            },
          }}
        />

        <CookTimeField
          name={minutesName}
          label="минут"
          params={{
            max: {
              value: 59,
              message: 'В 1 часе 59 минут',
            },
            validate: {
              checkNumbers: (val: string) => {
                if (!val) return;

                return (
                  /^\d{1,2}$/.test(val) || 'Можно использовать только цифры'
                );
              },
              checkHours: (val: number) => {
                if (val > 0) clearErrors(hoursName);

                return val > 0 || getValues(hoursName) > 0;
              },
            },
          }}
        />
      </div>

      {errors[hoursName] && (
        <ErrorMessage message={errors[hoursName]?.message as string} />
      )}

      {errors[minutesName] && (
        <ErrorMessage message={errors[minutesName]?.message as string} />
      )}
    </div>
  );
};
