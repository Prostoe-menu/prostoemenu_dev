import React from 'react';
import Style from './Tooltip.module.scss';
import questionIcon from '../../img/help-tooltip.svg';

const Tooltip = ({ altText }) => (
  <div className={Style.container}>
    <div className={Style.tooltip}>
      <span className={Style.tooltipText}>
        Время активной готовки блюда без учёта того, сколько оно варится,
        жарится, запекается и т.д.
      </span>
    </div>
    <img className={Style.icon} src={questionIcon} alt={altText} />
  </div>
);

export default Tooltip;
