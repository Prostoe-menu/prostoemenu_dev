import styles from './Title.module.scss';

export const Title = ({ children }) => {
  return <h4 className={styles.title}>{children}</h4>;
};
