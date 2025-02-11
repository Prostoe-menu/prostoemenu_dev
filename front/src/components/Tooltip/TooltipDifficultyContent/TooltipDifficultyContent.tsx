import starFilled from 'assets/images/star-filled.svg';
import styles from './TooltipDifficultyContent.module.scss';

const TooltipDifficultyContent = () => (
  <ul className={styles.recipeDifficultyList}>
    <li className={styles.recipeDifficulty}>
      <img src={starFilled} alt="Иконка сложности рецепта" />
      <span className={styles.text}>просто</span>
    </li>
    <li className={styles.recipeDifficulty}>
      <img src={starFilled} alt="Иконка сложности рецепта" />
      <img src={starFilled} alt="Иконка сложности рецепта" />
      <span className={styles.text}>средне</span>
    </li>
    <li className={styles.recipeDifficulty}>
      <img src={starFilled} alt="Иконка сложности рецепта" />
      <img src={starFilled} alt="Иконка сложности рецепта" />
      <img src={starFilled} alt="Иконка сложности рецепта" />
      <span className={styles.text}>тяжело</span>
    </li>
  </ul>
);

export default TooltipDifficultyContent;
