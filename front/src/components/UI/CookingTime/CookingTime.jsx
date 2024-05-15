import { timeFormat } from 'helpers/utils';
import styles from './CookingTime.module.scss';

export const CookingTime = ({ minutes }) => {
  return <span className={styles.cookingTime}>{timeFormat(minutes)}</span>;
};
