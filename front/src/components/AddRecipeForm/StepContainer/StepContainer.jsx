import StepTitle from './elements';
import styles from './StepContainer.module.scss';

const StepContainer = ({ title, subtitle, children }) => (
  <section className={styles.stepContainer}>
    <StepTitle subtitle={subtitle}>{title}</StepTitle>
    {children}
  </section>
);

export default StepContainer;
