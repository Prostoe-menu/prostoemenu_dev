import { timeFormat } from 'helpers/utils';
import styles from './CookingTime.module.scss';

const CookingTime = ({ minutes }) => {
  return <span className={styles.cookingTime}>{timeFormat(minutes)}</span>;
};

export default CookingTime;
