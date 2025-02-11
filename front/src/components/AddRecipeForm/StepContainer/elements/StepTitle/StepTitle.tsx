import { PropsWithChildren } from 'react';
import styles from './StepTitle.module.scss';

const StepTitle = ({
  subtitle,
  children,
}: PropsWithChildren<{ subtitle?: string }>) => {
  return (
    <>
      <h2 className={styles.title}>{children}</h2>
      <p className={styles.subTitle}>{subtitle}</p>
    </>
  );
};

export default StepTitle;
