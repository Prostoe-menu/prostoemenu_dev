import styles from './ErrorMessage.module.scss';

export const ErrorMessage = ({ message }) => {
  return <div className={styles.error}>{message}</div>;
};
