import styles from './StepTitle.module.scss';

const StepTitle = ({ children }) => {
  return (
    <>
      <h2 className={styles.title}>{children}</h2>
      <p className={styles.subTitle}>
        Поля, отмеченные *, обязательны для заполнения
      </p>
    </>
  );
};

export default StepTitle;
