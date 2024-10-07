import cn from 'classnames';
import styles from './LetterCounter.module.scss';

export const LetterCounter = ({ count, total, isError, className }) => {
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
