import { Step } from './Step/Step';
import styles from './Steps.module.scss';

export const Steps = ({ list }) => {
  return (
    <>
      <h2 className={styles.title}>Способ приготовления</h2>
      <ul className={styles.cooking}>
        {list.map((step, idx) => (
          <Step item={step} key={`step${idx}`} />
        ))}
      </ul>
    </>
  );
};
