import styles from './ErrorMessage.module.scss';

export const ErrorMessage = ({ message }) => {
  return (
    <p role="alert" className={styles.error}>
      {message}
    </p>
  );
};
