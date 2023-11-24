import React from 'react';
import starFilled from 'images/star-filled.svg';
import styles from './TooltipDifficultyContent.module.scss';

const TooltipDifficultyContent = () => (
  <>
    <div>
      <img src={starFilled} alt="Иконка сложности рецепта" />
      <span className={styles.text}> — просто</span>
    </div>
    <div>
      <img src={starFilled} alt="Иконка сложности рецепта" />
      <img src={starFilled} alt="Иконка сложности рецепта" />
      <span className={styles.text}> — средне</span>
    </div>
    <div>
      <img src={starFilled} alt="Иконка сложности рецепта" />
      <img src={starFilled} alt="Иконка сложности рецепта" />
      <img src={starFilled} alt="Иконка сложности рецепта" />
      <span className={styles.text}> — тяжело</span>
    </div>
  </>
);

export default TooltipDifficultyContent;
