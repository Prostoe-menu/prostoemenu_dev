import { PropsWithChildren } from 'react';
import styles from './Title.module.scss';

export const Title = ({ children }: PropsWithChildren) => {
  return <h4 className={styles.title}>{children}</h4>;
};
