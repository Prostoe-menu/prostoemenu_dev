import { timeFormat } from 'helpers/utils';
import styles from './OvenTime.module.scss';

export const OvenTime = ({ minutes }) => {
  return <span className={styles.ovenTime}>{timeFormat(minutes)}</span>;
};
