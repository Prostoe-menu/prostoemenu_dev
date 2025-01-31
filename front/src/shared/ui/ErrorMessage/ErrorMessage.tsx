import styles from './ErrorMessage.module.scss';

type TErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: TErrorMessageProps) => {
  return <div className={styles.error}>{message}</div>;
};

export default ErrorMessage;
