import { PropsWithChildren } from 'react';
import cn from 'classnames';
import styles from './FieldWrap.module.scss';

type TFieldWrapProps = {
  className: string;
  isError: boolean;
};

export const FieldWrap = ({
  children,
  className,
  isError,
}: PropsWithChildren<TFieldWrapProps>) => {
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
