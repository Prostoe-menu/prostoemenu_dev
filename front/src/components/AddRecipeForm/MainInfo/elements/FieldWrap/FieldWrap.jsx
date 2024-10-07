import cn from 'classnames';
import styles from './FieldWrap.module.scss';

export const FieldWrap = ({ children, className, isError }) => {
  return (
    <div
      className={cn(className, styles.wrap, {
        [styles.error]: isError,
      })}
    >
      {children}
    </div>
  );
};
