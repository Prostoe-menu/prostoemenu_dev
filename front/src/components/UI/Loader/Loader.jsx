import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div
      className={styles.spinner}
      aria-busy={'true'}
      aria-describedby="Loading..."
    >
      <div className={styles.border}>
        <div className={styles.core}></div>
      </div>
    </div>
  );
};

export default Loader;
