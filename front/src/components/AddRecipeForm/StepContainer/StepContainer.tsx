import { PropsWithChildren } from 'react';
import StepTitle from './elements';
import styles from './StepContainer.module.scss';

type TStepContainerProps = {
  title: string;
  subtitle?: string;
};

const StepContainer = ({
  title,
  subtitle,
  children,
}: PropsWithChildren<TStepContainerProps>) => (
  <section>
    <div className={styles.inner}>
      <StepTitle subtitle={subtitle}>{title}</StepTitle>
      {children}
    </div>
  </section>
);

export default StepContainer;
