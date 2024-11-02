import StepTitle from './elements';
import styles from './StepContainer.module.scss';

const StepContainer = ({ title, subtitle, children }) => (
  <section>
    <div className={styles.inner}>
      <StepTitle subtitle={subtitle}>{title}</StepTitle>
      {children}
    </div>
  </section>
);

export default StepContainer;
