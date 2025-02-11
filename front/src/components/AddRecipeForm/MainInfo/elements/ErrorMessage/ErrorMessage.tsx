import styles from './ErrorMessage.module.scss';

type TErrorMessageProps = {
  message: string;
};

export const ErrorMessage = ({ message }: TErrorMessageProps) => {
  return (
    <p role="alert" className={styles.error}>
      {message}
    </p>
  );
};
