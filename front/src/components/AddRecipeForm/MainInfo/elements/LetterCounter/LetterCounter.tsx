import cn from 'classnames';
import styles from './LetterCounter.module.scss';

type TLetterCounterProps = {
  count: number;
  total: number;
  isError: boolean;
  className?: string;
};

export const LetterCounter = ({
  count,
  total,
  isError,
  className,
}: TLetterCounterProps) => {
  return (
    <p
      className={cn(className, styles.counter, {
        [styles.error]: isError,
      })}
    >
      {count} / {total}
    </p>
  );
};
