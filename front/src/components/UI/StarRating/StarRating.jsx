import React from 'react';
import StarSVG from '../../../images/star.svg';
import styles from './StarRating.module.scss';

const StarRating = (label, amount) => (
  <div className={styles.stars}>
    {label} {amount} <StarSVG />
  </div>
);

export default StarRating;
