import React from 'react';
import Style from './TooltipDifficultyContent.module.scss';
import starFilled from '../../../images/star-filled.svg';

const TooltipDifficultyContent = () => (
  <>
    <div>
      <img src={starFilled} alt="Иконка сложности рецепта" />
      <span className={Style.text}> — просто</span>
    </div>
    <div>
      <img src={starFilled} alt="Иконка сложности рецепта" />
      <img src={starFilled} alt="Иконка сложности рецепта" />
      <span className={Style.text}> — средне</span>
    </div>
    <div>
      <img src={starFilled} alt="Иконка сложности рецепта" />
      <img src={starFilled} alt="Иконка сложности рецепта" />
      <img src={starFilled} alt="Иконка сложности рецепта" />
      <span className={Style.text}> — тяжело</span>
    </div>
  </>
);

export default TooltipDifficultyContent;
