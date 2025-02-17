import { timeFormat } from 'helpers/utils';
import styles from './OvenTime.module.scss';

type TOvenTimeProps = {
  minutes: number;
};

const OvenTime = ({ minutes }: TOvenTimeProps) => {
  return <span className={styles.ovenTime}>{timeFormat(minutes)}</span>;
};

export default OvenTime;
