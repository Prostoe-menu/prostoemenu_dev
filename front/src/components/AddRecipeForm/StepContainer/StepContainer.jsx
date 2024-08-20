import StepTitle from './elements';
import styles from './StepContainer.module.scss';

const StepContainer = ({ title, children }) => (
  <section className={styles.stepContainer}>
    <StepTitle>{title}</StepTitle>
    {children}
  </section>
);

export default StepContainer;
