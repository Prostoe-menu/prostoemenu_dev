import cn from 'classnames';
import styles from './Loader.module.scss';

const Loader = ({ size = 'large' }) => {
  return (
    <div
      className={cn(styles.spinner, styles[size])}
      aria-busy={'true'}
      aria-describedby="Loading..."
    >
      <div className={cn(styles.border, styles[size])}>
        <div className={styles.core}></div>
      </div>
    </div>
  );
};

export default Loader;
