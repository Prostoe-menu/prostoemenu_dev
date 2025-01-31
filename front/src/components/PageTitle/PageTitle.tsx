import { PropsWithChildren } from 'react';
import styles from './PageTitle.module.scss';

const PageTitle = ({ children }: PropsWithChildren) => (
  <h1 className={styles.title}>{children}</h1>
);

export default PageTitle;
